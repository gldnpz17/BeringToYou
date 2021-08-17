import DOMPurify from 'dompurify';
import { encode } from 'html-entities';
import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';

class MapShopIcon extends L.DivIcon {
  constructor(divClass, labelClass, svgIcon, shopName) {
    super({
      className: divClass,
      html:
        ReactDOMServer.renderToString(svgIcon) +
        DOMPurify.sanitize(`<p class='${labelClass}'>${encode(shopName)}</p>`)
    });
  }
}

export default MapShopIcon;