import React, { useState } from 'react'
import { cn } from "@/lib/utils"
import { Button } from './button'
import { ChevronRight, ChevronDown, Plus, Trash2, Folder, FolderOpen, File } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'

interface TreeNode {
  id: string
  label: string
  children?: TreeNode[]
  level: number
}

interface TreeProps {
  onNodeClick: (node: TreeNode) => void
  isCollapsed?: boolean
  onRootClick?: () => void
}

export const Tree: React.FC<TreeProps> = ({ onNodeClick, isCollapsed, onRootClick }) => {
  const [nodes, setNodes] = useState<TreeNode[]>([
    {
      id: '1',
      label: 'Root Node 1',
      level: 0,
      children: [
        {
          id: '1-1',
          label: 'Level 1 Node 1',
          level: 1,
          children: [
            { id: '1-1-1', label: 'Level 2 Node 1', level: 2 },
            { id: '1-1-2', label: 'Level 2 Node 2', level: 2 }
          ]
        }
      ]
    },
    {
      id: '2',
      label: 'Root Node 2',
      level: 0,
      children: [
        {
          id: '2-1',
          label: 'Level 1 Node 2',
          level: 1,
          children: [
            { id: '2-1-1', label: 'Level 2 Node 3', level: 2 }
          ]
        }
      ]
    }
  ])

  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['1', '2']))

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev)
      if (next.has(nodeId)) {
        next.delete(nodeId)
      } else {
        next.add(nodeId)
      }
      return next
    })
  }

  const addNode = (parentId: string | null) => {
    const newNode: TreeNode = {
      id: Math.random().toString(36).substr(2, 9),
      label: `New Node ${Math.floor(Math.random() * 1000)}`,
      level: parentId ? getNodeLevel(parentId) + 1 : 0
    }

    if (!parentId) {
      setNodes([...nodes, newNode])
      return
    }

    const updateNodes = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.map(node => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [...(node.children || []), newNode]
          }
        }
        if (node.children) {
          return {
            ...node,
            children: updateNodes(node.children)
          }
        }
        return node
      })
    }

    setNodes(updateNodes(nodes))
    setExpandedNodes(prev => new Set([...prev, parentId]))
  }

  const removeNode = (nodeId: string) => {
    const removeNodeFromArray = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.filter(node => {
        if (node.id === nodeId) return false
        if (node.children) {
          node.children = removeNodeFromArray(node.children)
        }
        return true
      })
    }

    setNodes(removeNodeFromArray(nodes))
  }

  const getNodeLevel = (nodeId: string): number => {
    const findLevel = (nodes: TreeNode[]): number => {
      for (const node of nodes) {
        if (node.id === nodeId) return node.level
        if (node.children) {
          const level = findLevel(node.children)
          if (level !== -1) return level
        }
      }
      return -1
    }
    return findLevel(nodes)
  }

  const handleNodeClick = (node: TreeNode) => {
    if (isCollapsed && node.level === 0) {
      onRootClick?.()
      return
    }
    onNodeClick(node)
  }

  const renderNode = (node: TreeNode, level: number = 0) => {
    const hasChildren = node.children && node.children.length > 0
    const isExpanded = expandedNodes.has(node.id)

    if (isCollapsed && level > 0) return null

    const nodeIcon = node.level === 0 ? (
      isExpanded ? <FolderOpen size={20} /> : <Folder size={20} />
    ) : (
      <File size={16} />
    )

    const nodeContent = (
      <div
        className={cn(
          "flex items-center gap-2 py-1 px-2 hover:bg-gray-100 rounded-md cursor-pointer group",
          { "ml-6": level > 0 && !isCollapsed }
        )}
        onClick={() => handleNodeClick(node)}
      >
        {!isCollapsed && hasChildren && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleNode(node.id)
            }}
            className="w-4 h-4 flex items-center justify-center"
          >
            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        )}
        
        {!isCollapsed && !hasChildren && <div className="w-4" />}
        
        {isCollapsed ? (
          node.level === 0 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex justify-center w-full">
                    {nodeIcon}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{node.label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        ) : (
          <>
            {nodeIcon}
            <span className="flex-grow hover:text-blue-600">
              {node.label}
            </span>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => {
                  e.stopPropagation()
                  addNode(node.id)
                }}
              >
                <Plus size={14} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => {
                  e.stopPropagation()
                  removeNode(node.id)
                }}
              >
                <Trash2 size={14} />
              </Button>
            </div>
          </>
        )}
      </div>
    )

    return (
      <div key={node.id} className="select-none">
        {nodeContent}
        {hasChildren && isExpanded && !isCollapsed && (
          <div className="ml-4">
            {node.children!.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn("p-4", { "px-2": isCollapsed })}>
      {!isCollapsed && (
        <div className="mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => addNode(null)}
            className="w-full"
          >
            Add Root Node
          </Button>
        </div>
      )}
      {nodes.map(node => renderNode(node))}
    </div>
  )
}
