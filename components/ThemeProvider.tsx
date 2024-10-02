'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
    theme: Theme
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme | null>(null)

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme | null
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

        if (savedTheme) {
            setTheme(savedTheme)
        } else {
            setTheme(prefersDark ? 'dark' : 'light')
        }
    }, [])

    useEffect(() => {
        if (theme) {
            document.documentElement.classList.toggle('dark', theme === 'dark')
            localStorage.setItem('theme', theme)
        }
    }, [theme])

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
    }

    if (theme === null) {
        return null // 또는 로딩 인디케이터
    }

    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
          {children}
      </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}