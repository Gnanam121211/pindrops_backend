# Pindrops Website - Easy cPanel Hosting

This is a simplified, static version of the Pindrops crypto trading platform website that can be easily hosted on any cPanel hosting service without complex build processes.

## What's Included

- `index.html` - Main website file
- `styles.css` - Custom CSS with animations and responsive design
- `script.js` - JavaScript functionality for interactivity
- `favicon.ico` - Website icon
- `README.md` - This file

## Features

✅ **Fully Responsive Design** - Works on desktop, tablet, and mobile
✅ **Modern Animations** - Smooth transitions and hover effects
✅ **Interactive Charts** - Real-time crypto price charts
✅ **Live Market Data** - Cryptocurrency price tables
✅ **Trading Signals** - Display of trading recommendations
✅ **Social Media Integration** - Links to Telegram and Twitter
✅ **Professional UI** - Clean, modern design with Tailwind CSS

## How to Host on cPanel

### Step 1: Access Your cPanel
1. Log into your hosting account
2. Open cPanel from your hosting dashboard

### Step 2: Upload Files
1. Open **File Manager** in cPanel
2. Navigate to `public_html` folder (or your domain's folder)
3. Upload all files from this folder:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `favicon.ico`

### Step 3: Set Permissions (if needed)
- Ensure files have 644 permissions
- Folders should have 755 permissions

### Step 4: Test Your Website
- Visit your domain in a web browser
- Check that all features work correctly

## Alternative Upload Methods

### Method 1: File Manager (Recommended)
1. Zip all files into `pindrops-website.zip`
2. Upload the zip file to cPanel File Manager
3. Extract the zip file in `public_html`

### Method 2: FTP Upload
1. Use an FTP client (FileZilla, WinSCP, etc.)
2. Connect to your hosting server
3. Upload files to the `public_html` directory

## Customization

### Changing Colors
Edit the `styles.css` file to modify:
- Background colors
- Text colors
- Button colors
- Gradient effects

### Adding Content
Edit the `index.html` file to:
- Update text content
- Add new sections
- Modify navigation links
- Change social media links

### Modifying Functionality
Edit the `script.js` file to:
- Add new interactive features
- Modify chart data sources
- Update API endpoints
- Change animation behaviors

## Technical Details

### Dependencies (CDN-based)
- **Tailwind CSS** - For styling and responsive design
- **Lucide Icons** - For modern icon set
- **Chart.js** - For interactive charts
- All dependencies are loaded from CDN, no local installation required

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance
- Optimized for fast loading
- Minimal external dependencies
- Compressed CSS and JavaScript
- Responsive images

## Troubleshooting

### Website Not Loading
1. Check file permissions (644 for files, 755 for folders)
2. Ensure `index.html` is in the correct directory
3. Verify domain DNS settings

### Missing Icons
1. Check internet connection (icons load from CDN)
2. Verify Lucide Icons CDN is accessible
3. Check browser console for errors

### Charts Not Working
1. Ensure Chart.js CDN is loading
2. Check browser console for JavaScript errors
3. Verify internet connection for CDN resources

### Mobile Issues
1. Test on different devices
2. Check viewport meta tag in HTML
3. Verify responsive CSS classes

## Support

For technical support or customization requests:
- Check browser console for error messages
- Verify all files are uploaded correctly
- Ensure hosting supports HTML/CSS/JavaScript

## License

This is a simplified version created for easy hosting. Original design and functionality based on the Pindrops crypto trading platform.

---

**Ready to host!** Simply upload these files to your cPanel hosting and your website will be live.

