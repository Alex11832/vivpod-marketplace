# Deployment Instructions

## GitHub Pages Setup

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub: https://github.com/Alex11832/vivpod-marketplace
2. Click on **Settings** tab
3. Scroll down to **Pages** section (in the left sidebar)
4. Under **Source**, select:
   - Branch: `master`
   - Folder: `/ (root)`
5. Click **Save**

### Step 2: Wait for Deployment

GitHub will automatically build and deploy your site. This usually takes 1-2 minutes.

You can check the deployment status:
- Go to **Actions** tab in your repository
- You'll see the deployment workflow running

### Step 3: Access Your Site

Once deployed, your site will be available at:
- **Default URL**: https://alex11832.github.io/vivpod-marketplace/

### Step 4: Configure Custom Domain (vivpod.com)

#### A. In GitHub Repository Settings:

1. Go to **Settings** → **Pages**
2. Under **Custom domain**, enter: `vivpod.com`
3. Click **Save**
4. Check **Enforce HTTPS** (after DNS propagates)

#### B. Configure DNS at Your Domain Registrar:

**Option 1: Using A Records (Recommended)**

Add these A records for `vivpod.com`:
```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

Add CNAME for www subdomain:
```
Type: CNAME
Name: www
Value: alex11832.github.io
```

**Option 2: Using CNAME (Alternative)**

```
Type: CNAME
Name: @
Value: alex11832.github.io
```

#### C. Create CNAME File

Create a file named `CNAME` in the root of your repository with content:
```
vivpod.com
```

Then commit and push:
```bash
echo "vivpod.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

### Step 5: Update _config.yml

Update the `url` in `_config.yml`:

```yaml
url: "https://vivpod.com"
baseurl: ""
```

Commit and push:
```bash
git add _config.yml
git commit -m "Update site URL to custom domain"
git push
```

## DNS Propagation

- DNS changes can take 24-48 hours to propagate globally
- You can check DNS propagation at: https://www.whatsmydns.net/
- Enter your domain and check if A records point to GitHub's IPs

## Troubleshooting

### Site Not Loading

1. Check if GitHub Pages is enabled in Settings
2. Verify the branch is set to `master`
3. Check the Actions tab for build errors
4. Clear your browser cache

### Custom Domain Not Working

1. Verify DNS records are correct
2. Wait for DNS propagation (up to 48 hours)
3. Make sure CNAME file exists in repository root
4. Check that HTTPS is enforced after DNS propagates

### Build Errors

1. Check the Actions tab for error messages
2. Verify Gemfile dependencies
3. Make sure all files are properly committed
4. Check Jekyll version compatibility

## Testing Locally

Before deploying, test locally:

```bash
bundle exec jekyll serve
```

Visit http://localhost:4000 to preview your site.

## Updating the Site

After making changes:

```bash
git add .
git commit -m "Your commit message"
git push
```

GitHub will automatically rebuild and redeploy your site.

## Performance Tips

1. **Enable HTTPS**: Always use HTTPS for better SEO and security
2. **Optimize Images**: Compress images before uploading
3. **Minify CSS/JS**: Consider using Jekyll plugins for minification
4. **Use CDN**: GitHub Pages uses a CDN automatically
5. **Cache Headers**: Configured automatically by GitHub Pages

## Monitoring

- **GitHub Actions**: Monitor deployment status
- **Google Analytics**: Add tracking code to `_layouts/default.html`
- **Google Search Console**: Submit your sitemap at `/sitemap.xml`

## Backup

Your site is automatically backed up in the GitHub repository. To create a local backup:

```bash
git clone https://github.com/Alex11832/vivpod-marketplace.git
```

---

For more information, visit: https://docs.github.com/en/pages
