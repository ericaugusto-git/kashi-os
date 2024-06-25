export type Theme = {
    color: string;
    accent: string;
    name?: string;
    wpp?: string;
  };
  
  export const themes: Record<string, Theme> = {
    light: {
      // color: '154,171,204',
      // color: '160,172,215',
      // color: '198,192,215',
      // rgb(133 155 186)
      // rgb(71 86 115)
      // rgb(102 114 138)
      // color: '76,93,143',
      color: '71,86,115',


      accent: '203,174,187',
      name: 'Lake Slate'
    },
    dark: {
      // rgb(128 179 205)
      // rgb(110 147 204)
      // rgb(31 33 43)
      color: '31,33,43',
      accent: '89,162,177',
      name: 'Nord'
    },
    cozy: {
      color: '66,62, 59',
      accent: '199,178,143',
      name: 'Cozy'
    }
  };
  
  export const transitionMs = '1200ms'