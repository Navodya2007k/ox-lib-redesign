import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  colorScheme: 'dark',
  fontFamily: 'Roboto',
  shadows: { sm: '1px 1px 3px rgba(0, 0, 0, 0.5)' },
  components: {
    Modal: {
      styles: {
        modal: {
         
          backgroundColor: '#9112bc2c',
        },
      },
    },

    TextInput: {
      styles: {
        input: {
          backgroundColor: '#9112bc2c',
          border:'solid 1px rgba(255,255,255,0.2)',
        },
      },
    },
    
    TimeInput: {
      styles: {
        input: {
          backgroundColor: '#9112bc2c',
          border:'solid 1px rgba(255,255,255,0.2)',
        },
      },
    },

    Select: {
      styles: {
        input: {
          backgroundColor: '#9112bc2c',
          border:'solid 1px rgba(255,255,255,0.2)',
        },
      },
    },


    MultiSelect: {
      styles: {
        input: {
          backgroundColor: '#9112bc2c',
          border:'solid 1px rgba(255,255,255,0.2)',
        },
      },
    },

    NumberInput: {
      styles: {
        input: {
          backgroundColor: '#9112bc2c',
          border:'solid 1px rgba(255,255,255,0.2)',
        },

        
      },
    },

    Checkbox: {
      styles: {
        input: {
          color:'white',
          backgroundColor: '#9112bc2c',
          border:'solid 1px rgba(255,255,255,0.2)',
        },
      },
    },

    PasswordInput: {
      styles: {
        input: {
          backgroundColor: '#9112bc2c',
          border:'solid 1px rgba(255,255,255,0.2)',
        },
        icon: {
          backgroundColor: '#9112BC',
          border:'solid 1px rgba(255,255,255,0.2)',
          color:'white',
        },
      },
    },

    Button: {
      styles: {
        root: {
          backgroundColor: '#1a0322ff',
          color:'white',
          ":hover": { backgroundColor: '#ff0000ff' },
        },
      },
    },
  },
};
