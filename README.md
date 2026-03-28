# fastpic_redirect

*It was dead but I suddently need it again 6 years later* 🙃

A Chrome/Chromium extension (Manifest V3) that skips the advertisement on
`fastpic.org` image hosting and shows the full image directly.
Requires Chrome 84 or later.

### How it works

When you navigate to a `fastpic.org` image page, the extension redirects from
the `/view/` page to `/fullview/` and removes the interstitial overlay, so
the image is shown immediately. Click the toolbar icon to toggle on or off.

Without `fastpic_redirect` | With `fastpic_redirect`
:---: | :---:
<img src='https://raw.githubusercontent.com/sukiboo/fastpic_redirect/master/examples/sbn_off.png' title='fastpic_redirect is off' width='420'> | <img src='https://raw.githubusercontent.com/sukiboo/fastpic_redirect/master/examples/sbn_on.png' title='fastpic_redirect is on' width='420'>

### Installation

1. Navigate to `chrome://extensions`
2. Enable **Developer mode** in the top right corner
3. Click **Load unpacked**
4. Select the `fastpic_redirect` folder

### License

This project is licensed under the [MIT License](https://mit-license.org/).
