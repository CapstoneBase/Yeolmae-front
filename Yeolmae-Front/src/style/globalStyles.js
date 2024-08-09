import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-family: NotoSans;
        background-color: #F5F5F5;
    }

    @font-face {
        font-family: 'NotoSans';
        font-weight: normal;
        font-style: normal;
        font-display: swap;
        src: url('../fonts/NotoSansKR-Regular.woff') format('font-woff');
      }
      
      @font-face {
        font-family: 'NotoSans';
        font-weight: light;
        font-style: normal;
        font-display: swap;
        src: url('../fonts/NotoSansKR-Light.woff') format('font-woff');
      }
      
      @font-face {
        font-family: 'NotoSans';
        font-weight: semibold;
        font-style: normal;
        font-display: swap;
        src: url('../fonts/NotoSansKR-SemiBold.woff') format('font-woff');
      }
      
      @font-face {
        font-family: 'NotoSans';
        font-weight: extrabold;
        font-style: normal;
        font-display: swap;
        src: url('../fonts/NotoSansKR-ExtraBold.woff') format('font-woff');
      }
`;

export default GlobalStyle;
