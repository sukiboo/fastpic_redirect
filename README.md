# sbn_fastpic_redirect

A Chrome/Chromium extension (Manifest V3) that skips the advertisement on
fastpic.ru image hosting and shows the full image directly.

Requires Chrome 84 or later.

### How it works

When you navigate to a fastpic.ru image page, the extension redirects from
the `/view/` page to `/fullview/` and removes the interstitial overlay, so
the image is shown immediately. Click the toolbar icon to toggle on or off.

### Demonstration

without `sbn_fastpic_redirect` | with `sbn_fastpic_redirect`
:---: | :---:
<img src='https://raw.githubusercontent.com/sukiboo/sbn_fastpic_redirect/master/examples/sbn_off.png' title='sbn_fastpic_redirect is off' width='420'> | <img src='https://raw.githubusercontent.com/sukiboo/sbn_fastpic_redirect/master/examples/sbn_on.png' title='sbn_fastpic_redirect is on' width='420'>

### Installation

1. Navigate to `chrome://extensions`
2. Enable **Developer mode** in the top right corner
3. Click **Load unpacked**
4. Select the `sbn_fastpic_redirect` folder

Note: since this is an unpacked extension, Chrome will show a warning on
each launch; Chromium will not.

### License

This project is licensed under the [MIT License](https://mit-license.org/).
