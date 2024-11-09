package main

import (
	"context"
	"fmt"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) OpenDirectoryDialog(options runtime.OpenDialogOptions) (string, error) {
    return runtime.OpenDirectoryDialog(a.ctx, options)
}

func (a *App) OpenMultipleFilesDialog(options runtime.OpenDialogOptions) ([]string, error) {
    return runtime.OpenMultipleFilesDialog(a.ctx, options)
}

// Menu handler functions
func (a *App) HandleAbout() {
    runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
        Type:    runtime.InfoDialog,
        Title:   "About",
        Message: "Base Wails Application v1.0.0",
    })
}

func (a *App) HandleQuit() {
    runtime.Quit(a.ctx)
}

func (a *App) HandlePreferences() {
    runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
        Type:    runtime.InfoDialog,
        Title:   "Preferences",
        Message: "Preferences dialog would open here",
    })
}

func (a *App) HandleFileNew() {
    runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
        Type:    runtime.InfoDialog,
        Title:   "New File",
        Message: "Create new file functionality would go here",
    })
}

func (a *App) HandleFileOpen() {
    runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
        Type:    runtime.InfoDialog,
        Title:   "Open File",
        Message: "Open file functionality would go here",
    })
}

// Edit menu handlers with clipboard operations
func (a *App) HandleCut() {
	runtime.WindowExecJS(a.ctx, `
		var el = document.activeElement;
		if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) {
			const start = el.selectionStart;
			const end = el.selectionEnd;
			const selected = el.value.substring(start, end);
			if (selected) {
				window.runtime.ClipboardSetText(selected).then(() => {
					el.value = el.value.substring(0, start) + el.value.substring(end);
					el.setSelectionRange(start, start);
					// Reset React's internal value tracker
					const tracker = el._valueTracker;
					if (tracker) {
						tracker.setValue('');
					}
					// Trigger input event for React state update
					const event = new Event('input', { bubbles: true });
					el.dispatchEvent(event);
				});
			}
		}
	`)
}

func (a *App) HandleCopy() {
	runtime.WindowExecJS(a.ctx, `
		var el = document.activeElement;
		if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) {
			const start = el.selectionStart;
			const end = el.selectionEnd;
			const selected = el.value.substring(start, end);
			if (selected) {
				window.runtime.ClipboardSetText(selected);
			}
		}
	`)
}

func (a *App) HandlePaste() {
	runtime.WindowExecJS(a.ctx, `
		var el = document.activeElement;
		if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) {
			const start = el.selectionStart;
			const end = el.selectionEnd;
			window.runtime.ClipboardGetText().then(text => {
				if (text) {
					el.value = el.value.substring(0, start) + text + el.value.substring(end);
					el.setSelectionRange(start + text.length, start + text.length);
					// Reset React's internal value tracker
					const tracker = el._valueTracker;
					if (tracker) {
						tracker.setValue('');
					}
					// Trigger input event for React state update
					const event = new Event('input', { bubbles: true });
					el.dispatchEvent(event);
				}
			});
		}
	`)
}

func (a *App) HandleSelectAll() {
	runtime.WindowExecJS(a.ctx, `
		var el = document.activeElement;
		if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) {
			el.select();
		}
	`)
}
