import { render } from '../../testUtils';
import useResponsive from '@/hooks/useResponsive';
import { createTheme, ThemeProvider } from '@mui/material/styles';

describe('useResponsive', () => {
  it('run through all breakpoints', () => {
    const theme = createTheme({
      breakpoints: {
        values: {
          xs: 356,
          sm: 600,
          md: 960,
          lg: 1280,
          xl: 1920,
        },
      },
    });

    const TestComponent = () => {
      const isUps = [
        {
          breakpoint: 'xs',
          isUp: useResponsive('up', 'xs'),
          isDown:  useResponsive('down', 'xs'),
          isBetween: useResponsive('between', 'xs')
        },
        {
          breakpoint: 'sm',
          isUp: useResponsive('up', 'sm'),
          isDown:  useResponsive('down', 'sm'),
          isBetween: useResponsive('between', 'sm')
        }, {
          breakpoint: 'md',
          isUp: useResponsive('up', 'md'),
          isDown:  useResponsive('down', 'md'),
          isBetween: useResponsive('between', 'md')
        }, {
          breakpoint: 'lg',
          isUp: useResponsive('up', 'lg'),
          isDown:  useResponsive('down', 'lg'),
          isBetween: useResponsive('between', 'lg')
        }, {
          breakpoint: 'xl',
          isUp: useResponsive('up', 'xl'),
          isDown:  useResponsive('down', 'xl'),
          isBetween: useResponsive('between', 'xl')
        },

      ]

      return <div>
        <div>
          {isUps.map((scale) => {
            return(
              <span key={scale.breakpoint}>{scale.breakpoint} {scale.isUp}</span>
            )
          })}
        </div>
      </div>;
    };

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <TestComponent />
      </ThemeProvider>
    );

    expect(getByText('lg')).toBeInTheDocument();
  });

  // Add similar tests for other media query types ('down', 'between', 'only')
});