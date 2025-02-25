import { render, screen } from '@testing-library/react'
import { LogDashboard } from '../../src/components/LogDashboard'

// Mock the Lucide icons
jest.mock('lucide-react', () => ({
  RefreshCw: () => null,
  Trash2: () => null
}))

// Mock the store
jest.mock('../../src/store/gameStore', () => ({
  useGameStore: () => ({
    logs: [],
    clearLogs: jest.fn(),
    getLogStats: () => ({ 
      total: 0, 
      byType: {
        error: 0,
        warning: 0,
        info: 0
      } 
    }),
    fetchLogs: jest.fn(),
    loading: false,
    error: null
  })
}))

// Mock the chart components
jest.mock('../../src/components/logs/TimeSeriesChart', () => ({
  TimeSeriesChart: () => null
}))

jest.mock('../../src/components/logs/ErrorDistributionChart', () => ({
  ErrorDistributionChart: () => null
}))

jest.mock('../../src/components/logs/LogFilters', () => ({
  LogFilters: () => null
}))

jest.mock('../../src/components/logs/LogEntry', () => ({
  LogEntryComponent: () => null
}))

describe('LogDashboard', () => {
  describe('snapshot tests', () => {
    it('matches snapshot with default state', () => {
      const { container } = render(<LogDashboard />);
      expect(container).toMatchSnapshot();
    });
  });

  it('renders the dashboard title', () => {
    render(<LogDashboard />)
    
    const heading = screen.getByRole('heading', {
      name: /game logs dashboard/i,
    })
    
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveClass('text-2xl font-bold')
  })
})
