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
