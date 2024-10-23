import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export const RootPage: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Root Level Page</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is a root level page. Click on different tree nodes to navigate between pages.</p>
      </CardContent>
    </Card>
  )
}

export const Level1Page: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Level 1 Page</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is a level 1 page. It appears when clicking nodes that are one level deep in the tree.</p>
      </CardContent>
    </Card>
  )
}

export const Level2Page: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Level 2 Page</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is a level 2 page. It appears when clicking the deepest nodes in the tree.</p>
      </CardContent>
    </Card>
  )
}
