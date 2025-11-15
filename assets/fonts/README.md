# Font Files Setup

## Required Font Files

Please download the following font files and place them in this directory:

### Arabic Fonts (Noto Kufi Arabic)

- **NotoKufiArabic-Regular.ttf** - Download from: https://fonts.gstatic.com/s/notokufiarabic/v27/CSRp4ydQnPyaDxEXLFF6LZVLKrodhu8t57o1kDc5Wh5v34bP.ttf
- **NotoKufiArabic-Medium.ttf** - Download from: https://fonts.gstatic.com/s/notokufiarabic/v27/CSRp4ydQnPyaDxEXLFF6LZVLKrodhu8t57o1kDc5Wh5d34bP.ttf
- **NotoKufiArabic-Bold.ttf** - Download from: https://fonts.gstatic.com/s/notokufiarabic/v27/CSRp4ydQnPyaDxEXLFF6LZVLKrodhu8t57o1kDc5Wh6I2IbP.ttf

### English/Spanish Fonts (Inter)

- **Inter-Regular.ttf** - Download from Google Fonts or Inter website
- **Inter-Medium.ttf** - Download from Google Fonts or Inter website
- **Inter-Bold.ttf** - Download from Google Fonts or Inter website

## How to Download

### Method 1: Direct Download

1. Right-click on each URL above
2. Select "Save link as..." or "Download linked file"
3. Rename the files to match the names above
4. Place them in this `/assets/fonts/` directory

### Method 2: Using wget/curl (Command Line)

```bash
# Arabic fonts
wget -O NotoKufiArabic-Regular.ttf "https://fonts.gstatic.com/s/notokufiarabic/v27/CSRp4ydQnPyaDxEXLFF6LZVLKrodhu8t57o1kDc5Wh5v34bP.ttf"
wget -O NotoKufiArabic-Medium.ttf "https://fonts.gstatic.com/s/notokufiarabic/v27/CSRp4ydQnPyaDxEXLFF6LZVLKrodhu8t57o1kDc5Wh5d34bP.ttf"
wget -O NotoKufiArabic-Bold.ttf "https://fonts.gstatic.com/s/notokufiarabic/v27/CSRp4ydQnPyaDxEXLFF6LZVLKrodhu8t57o1kDc5Wh6I2IbP.ttf"
```

## File Structure

```
assets/
└── fonts/
    ├── fonts.css
    ├── NotoKufiArabic-Regular.ttf
    ├── NotoKufiArabic-Medium.ttf
    ├── NotoKufiArabic-Bold.ttf
    ├── Inter-Regular.ttf
    ├── Inter-Medium.ttf
    └── Inter-Bold.ttf
```

## Benefits

- ✅ Eliminates render-blocking external font requests
- ✅ Faster page load times
- ✅ Better Core Web Vitals scores
- ✅ Works offline
- ✅ No dependency on external CDNs
