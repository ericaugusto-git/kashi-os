export type Theme = {
    color: string;
    accent: string;
    font: string,
    name?: string;
    wpp?: {url: string, name: string};
    darker_color?: string;
  };
  
  export const themes: Record<string, Theme> = {
    // light: {
    //   // color: '154,171,204',
    //   // color: '160,172,215',
    //   // color: '198,192,215',
    //   // rgb(133 155 186)
    //   // rgb(71 86 115)
    //   // rgb(102 114 138)
    //   // color: '76,93,143',
    //   // color: '100,122,161',
    //   color: '242, 242, 242',
    //   // color: '255, 250, 238',
    //   // font: '153,163,208',
    //   darker_color: '232, 232, 232',
    //   font: '50, 53, 37',
    //   accent: '203,174,187',
    //   name: 'Lake Slate'
    // },
    light: {
      // color: '154,171,204',
      // color: '160,172,215',
      // color: '198,192,215',
      // rgb(133 155 186)
      // rgb(71 86 115)
      // rgb(102 114 138)
      // color: '76,93,143',
      // color: '100,122,161',
      darker_color: '31,38,51',
      color: '71,86,115',
      // font: '153,163,208',
      font: '255,255,255',
      accent: '203,174,187',
      name: 'Lake Slate'
    },
    dark: {
      // rgb(128 179 205)
      // rgb(110 147 204)
      // rgb(31 33 43)
      color: '31,33,43',
      // font: '110,123,159',
      // font: '89,162,177',
      darker_color: '21,23,30',
      font: '255,255,255',
      accent: '89,162,177',
      name: 'Nord'
    },
    cozy: {
      // accent: '242,219,74',
      // // color: '135,216,222',
      // // color: '57,118,133',
      // color: '24,24,24',
      // font: '196,165,118',
      darker_color: '41, 38, 36',
      font: '255,255,255',
      color: '66,62, 59',
      accent: '199,178,143',
      name: 'Cozy'
    }
  };
  // rgb()

  
  export const transitionMs = '1200ms'