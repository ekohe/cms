import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {cyan500} from 'material-ui/styles/colors';

export default function getTheme() {
  return getMuiTheme({
    fontFamily: "kozuka-gothic-pro, helvetica, sans-serif",
    palette: {
      accent1Color: cyan500,
    }
  });
}
