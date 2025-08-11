import Hyperspeed from './Hyperspeed.tsx'

const  parseNumber  = (value: string | null, fallback: number, min?: number, max?: number): number  => {
    if (value === null) return fallback
    const num = parseFloat(value)
    if (Number.isNaN(num)) return fallback
    if (min !== undefined && num < min) return fallback
    if (max !== undefined && num > max) return fallback
    return num
}

const  parseBoolean  = (value: string | null, fallback: boolean): boolean  => {
    if (value === null) return fallback
    const val = value.trim().toLowerCase()
    if (['true', '1', 'yes', 'y'].includes(val)) return true
    if (['false', '0', 'no', 'n'].includes(val)) return false
    return fallback
}

const  parseColor  = (value: string | null, fallback: number[]): number[]  => {
    if (!value) return fallback
    const parts = value.split(',').map(p => parseFloat(p.trim()))
    if (parts.length !== 3 || parts.some(n => Number.isNaN(n) || n < 0 || n > 1)) {
        return fallback
    }
    return parts
}

const App = () => {
    const params = new URLSearchParams(window.location.search)

    const amplitude = parseNumber(params.get('amplitude'), 0.3, 0, 5)
    const distance = parseNumber(params.get('distance'), 0.3, 0, 2)
    const enableMouseInteraction = parseBoolean(params.get('enableMouseInteraction'), true)
    const color = parseColor(params.get('color'), [0.3, 0.3, 0.3])

    return (
        <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden' }}>
            <Hyperspeed
                amplitude={amplitude}
                distance={distance}
                enableMouseInteraction={enableMouseInteraction}
                color={color}
            />
        </div>
    )
}

export default App
