import { createTheme } from '@mui/material';

const commonTypography = {
  fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
  h1: {
    fontSize: '2.7rem',
    fontWeight: 700,
    letterSpacing: 1.2,
  },
  h2: {
    fontSize: '2.2rem',
    fontWeight: 600,
  },
  h3: {
    fontSize: '1.8rem',
    fontWeight: 600,
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 600,
  },
  h5: {
    fontSize: '1.2rem',
    fontWeight: 500,
  },
  h6: {
    fontSize: '1rem',
    fontWeight: 500,
  },
  body1: {
    fontSize: '1.05rem',
    lineHeight: 1.6,
  },
  body2: {
    fontSize: '0.95rem',
    lineHeight: 1.5,
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Deep blue
      light: '#63a4ff',
      dark: '#004ba0',
      contrastText: '#fff',
    },
    secondary: {
      main: '#7c3aed', // Vibrant purple
      light: '#a78bfa',
      dark: '#4c1d95',
      contrastText: '#fff',
    },
    accent: {
      main: '#00bcd4', // Cyan accent
    },
    background: {
      default: '#f4f7fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#23272f',
      secondary: '#4b5563',
      disabled: '#b0b8c1',
    },
    divider: '#e0e7ef',
  },
  shape: {
    borderRadius: 14,
  },
  typography: commonTypography,
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
          color: '#23272f',
          borderRadius: 18,
          boxShadow: '0 4px 24px 0 rgba(60, 72, 88, 0.08)',
          transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: '0 20px 40px 0 rgba(60, 72, 88, 0.15), 0 0 0 3px rgba(33, 150, 243, 0.9), 0 0 40px rgba(33, 150, 243, 0.8), 0 0 80px rgba(33, 150, 243, 0.6), 0 0 120px rgba(33, 150, 243, 0.4)',
            border: '3px solid rgba(33, 150, 243, 0.9)',
            background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.3) 0%, rgba(96, 165, 250, 0.2) 50%, rgba(33, 150, 243, 0.3) 100%)',
            '&::before': {
              opacity: 1,
              transform: 'scale(1.1)',
              animation: 'profileGlow 2s ease-in-out infinite',
            },
            '&::after': {
              opacity: 0.8,
              transform: 'rotate(180deg) scale(1.2)',
              animation: 'haloEffect 3s ease-in-out infinite',
            },
            '& .flash-bg': {
              opacity: 1,
              animation: 'brightFlash 1.5s ease-in-out infinite',
            }
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, transparent 30%, rgba(59, 130, 246, 0.1) 50%, transparent 70%)',
            borderRadius: 18,
            opacity: 0,
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            zIndex: 1,
            pointerEvents: 'none',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            opacity: 0,
            transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            zIndex: 0,
            pointerEvents: 'none',
          },
          '@keyframes flash': {
            '0%, 100%': { 
              opacity: 0.25,
              background: 'linear-gradient(45deg, transparent 30%, rgba(59, 130, 246, 0.3) 50%, transparent 70%)'
            },
            '50%': { 
              opacity: 0.8,
              background: 'linear-gradient(45deg, transparent 30%, rgba(59, 130, 246, 0.7) 50%, transparent 70%)'
            }
          },
          '@keyframes pulse': {
            '0%, 100%': { 
              opacity: 0.3,
              transform: 'rotate(0deg) scale(1)'
            },
            '50%': { 
              opacity: 0.9,
              transform: 'rotate(180deg) scale(1.3)'
            }
          },
          '@keyframes flashBackground': {
            '0%, 100%': { 
              opacity: 0.15,
              background: 'rgba(59, 130, 246, 0.15)'
            },
            '50%': { 
              opacity: 0.5,
              background: 'rgba(59, 130, 246, 0.4)'
            }
          }
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#e0e7ef',
          color: '#1976d2',
          fontWeight: 600,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: '0 2px 8px 0 rgba(60, 72, 88, 0.08)',
        },
        containedPrimary: {
          background: 'linear-gradient(90deg, #1976d2 0%, #00bcd4 100%)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #1976d2 0%, #7c3aed 100%)',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8b5cf6', // Vibrant violet
      light: '#a78bfa',
      dark: '#7c3aed',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f59e0b', // Amber accent
      light: '#fbbf24',
      dark: '#d97706',
      contrastText: '#fff',
    },
    accent: {
      main: '#ec4899', // Pink accent
    },
    background: {
      default: 'transparent', // Transparent to show the gradient background
      paper: 'rgba(76, 29, 149, 0.8)', // Semi-transparent violet
    },
    text: {
      primary: '#f3f4f6',
      secondary: '#b0b8c1',
      disabled: '#6b7280',
    },
    divider: 'rgba(255, 255, 255, 0.1)',
  },
  shape: {
    borderRadius: 14,
  },
  typography: commonTypography,
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, rgba(76, 29, 149, 0.9) 0%, rgba(45, 27, 105, 0.9) 100%)',
          color: '#f3f4f6',
          borderRadius: 18,
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: '0 20px 40px 0 rgba(0,0,0,0.4), 0 0 0 3px rgba(33, 150, 243, 0.9), 0 0 40px rgba(33, 150, 243, 0.8), 0 0 80px rgba(33, 150, 243, 0.6), 0 0 120px rgba(33, 150, 243, 0.4)',
            border: '3px solid rgba(33, 150, 243, 0.9)',
            background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.4) 0%, rgba(96, 165, 250, 0.3) 50%, rgba(33, 150, 243, 0.4) 100%)',
            '&::before': {
              opacity: 1,
              transform: 'scale(1.2)',
              animation: 'profileGlow 2s ease-in-out infinite',
            },
            '&::after': {
              opacity: 1,
              transform: 'rotate(180deg) scale(1.5)',
              animation: 'haloEffect 3s ease-in-out infinite',
            },
            '& .flash-bg': {
              opacity: 1,
              animation: 'brightFlash 1.5s ease-in-out infinite',
            }
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-20%',
            left: '-20%',
            right: '-20%',
            bottom: '-20%',
            background: 'radial-gradient(circle, rgba(33, 150, 243, 0.6) 0%, rgba(33, 150, 243, 0.3) 40%, transparent 70%)',
            borderRadius: '50%',
            opacity: 0,
            transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            zIndex: 0,
            pointerEvents: 'none',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '-30%',
            left: '-30%',
            width: '160%',
            height: '160%',
            background: 'radial-gradient(circle, rgba(33, 150, 243, 0.4) 0%, rgba(96, 165, 250, 0.2) 50%, transparent 80%)',
            borderRadius: '50%',
            opacity: 0,
            transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            zIndex: -1,
            pointerEvents: 'none',
          },
          '@keyframes profileGlow': {
            '0%, 100%': { 
              opacity: 0.6,
              transform: 'scale(1.2)',
              background: 'radial-gradient(circle, rgba(33, 150, 243, 0.6) 0%, rgba(33, 150, 243, 0.3) 40%, transparent 70%)'
            },
            '50%': { 
              opacity: 1,
              transform: 'scale(1.3)',
              background: 'radial-gradient(circle, rgba(33, 150, 243, 0.9) 0%, rgba(33, 150, 243, 0.5) 40%, transparent 70%)'
            }
          },
          '@keyframes haloEffect': {
            '0%, 100%': { 
              opacity: 0.4,
              transform: 'rotate(0deg) scale(1.5)',
              background: 'radial-gradient(circle, rgba(33, 150, 243, 0.4) 0%, rgba(96, 165, 250, 0.2) 50%, transparent 80%)'
            },
            '50%': { 
              opacity: 0.8,
              transform: 'rotate(180deg) scale(1.7)',
              background: 'radial-gradient(circle, rgba(33, 150, 243, 0.7) 0%, rgba(96, 165, 250, 0.4) 50%, transparent 80%)'
            }
          },
          '@keyframes brightFlash': {
            '0%, 100%': { 
              opacity: 0.3,
              background: 'rgba(33, 150, 243, 0.3)'
            },
            '50%': { 
              opacity: 0.8,
              background: 'rgba(33, 150, 243, 0.8)'
            }
          }
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(139, 92, 246, 0.2)',
          color: '#8b5cf6',
          fontWeight: 600,
          border: '1px solid rgba(139, 92, 246, 0.3)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: '0 4px 16px 0 rgba(0,0,0,0.3)',
        },
        containedPrimary: {
          background: 'linear-gradient(90deg, #8b5cf6 0%, #ec4899 100%)',
          '&:hover': {
            background: 'linear-gradient(90deg, #7c3aed 0%, #db2777 100%)',
            boxShadow: '0 6px 20px 0 rgba(139, 92, 246, 0.4)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, rgba(45, 27, 105, 0.95) 0%, rgba(139, 92, 246, 0.95) 100%)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(45, 27, 105, 0.95)',
          color: '#f3f4f6',
          backdropFilter: 'blur(10px)',
          borderRight: '1px solid rgba(255,255,255,0.1)',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#f3f4f6',
          '&:hover': {
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
}); 