# Email-Password Authentication Setup Guide

This application uses Supabase's built-in email-password authentication instead of OAuth providers.

## 🚀 **Quick Setup Overview**

Simple email-password authentication that works out of the box with Supabase. No external OAuth providers needed!

## 📋 **Prerequisites**

1. **Supabase Project**: You need an active Supabase project
2. **Environment Variables**: Your `.env.local` should have:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## 🔧 **Step-by-Step Setup**

### **Step 1: Access Supabase Dashboard**

1. Go to [supabase.com](https://supabase.com)
2. Sign in to your account
3. Select your project
4. Navigate to **Authentication** → **Settings** in the sidebar

### **Step 2: Configure Email Authentication**

#### **2.1 Enable Email Provider**

1. In Supabase Dashboard → **Authentication** → **Settings**
2. Scroll down to **Auth Providers** section
3. Find **Email** and ensure it's **enabled** (it should be by default)
4. Configure email settings:

#### **2.2 Email Configuration Options**

```
✅ Enable email confirmations (Recommended)
✅ Enable email change confirmations (Recommended)  
✅ Secure email change (Recommended)
✅ Enable sign ups (Allow new user registration)
```

#### **2.3 Site URL Configuration**

Set your site URLs for proper redirects:

**For Development:**
```
Site URL: http://localhost:3000
```

**For Production:**
```
Site URL: https://your-domain.com
Additional redirect URLs: https://your-domain.com/auth/callback
```

### **Step 3: Email Templates (Optional)**

You can customize email templates in **Authentication** → **Email Templates**:

1. **Confirm signup**: Email sent when user registers
2. **Reset password**: Email sent for password reset
3. **Change email address**: Email sent when changing email

## 🔍 **Authentication Flow**

### **Sign Up Process**
1. User enters email and password in the modal
2. Supabase sends confirmation email
3. User clicks confirmation link in email
4. Account is activated and user can sign in

### **Sign In Process**
1. User enters email and password
2. Immediate authentication if email is confirmed
3. User is redirected to the application

### **Password Requirements**
- Minimum 6 characters (enforced by the form)
- Additional requirements can be configured in Supabase dashboard under **Authentication** → **Settings** → **Password Requirements**

## 🎨 **User Interface Features**

### **Authentication Modal**
- Clean modal interface for sign in/sign up
- Form validation and error handling
- Loading states during authentication
- Success messages for sign up confirmation
- Toggle between sign in and sign up modes

### **User Menu**
- Shows user email when authenticated
- Quick access to Track Orders
- Sign out functionality
- Responsive design for mobile/desktop

### **Cart Integration**
- Works for both guest and authenticated users
- Cart data persists in localStorage
- Future: Cart sync when user logs in

## 🔐 **Security Features**

- Secure password handling via Supabase
- Email confirmation prevents fake accounts
- Session management with automatic refresh
- Secure sign out that clears all session data
- CSRF protection built into Supabase

## 🧪 **Testing Authentication**

### **Test Sign Up**
1. Start your development server: `npm run dev`
2. Click the "Account" button in the navbar
3. Click "Create Account" in the dropdown
4. Enter a real email address and password (min 6 chars)
5. Check your email for confirmation link
6. Click the confirmation link
7. Return to the app and sign in

### **Test Sign In**
1. Click "Account" → "Sign In"
2. Enter your confirmed email and password
3. Should be immediately signed in
4. User menu should show your email

### **Test Sign Out**
1. When signed in, click your email in the user menu
2. Click "Sign Out"
3. Should return to signed-out state

## 🚨 **Common Issues & Solutions**

### **Issue 1: "Invalid login credentials" Error**
**Solutions:**
- Check if email is confirmed (check your email inbox)
- Verify password is correct
- Ensure email exists in Supabase Users table

### **Issue 2: "Email not confirmed" Error**
**Solutions:**
- Check email inbox (including spam folder)
- Resend confirmation email from Supabase dashboard
- Manually confirm user in Supabase dashboard for testing

### **Issue 3: Confirmation Email Not Received**
**Solutions:**
- Check spam/junk folder
- Verify email address is correct
- Check Supabase email settings
- Use a different email provider for testing

### **Issue 4: "User already registered" Error**
**Solutions:**
- User already exists, use sign in instead
- Check Supabase Users table to confirm
- Use password reset if password is forgotten

## 📱 **Production Deployment**

### **Before Deploying**
1. Update **Site URL** in Supabase to your production domain
2. Add production domain to **Additional redirect URLs**
3. Update environment variables in your hosting platform
4. Test email delivery in production environment

### **Email Delivery in Production**
- Supabase provides email delivery for development
- For production, consider configuring custom SMTP
- Monitor email delivery rates and bounces
- Set up proper SPF/DKIM records for your domain

## 📊 **Monitoring & Analytics**

### **Supabase Dashboard**
- Monitor user signups in **Authentication** → **Users**
- Check authentication logs for errors
- Track email confirmation rates
- Monitor failed login attempts

### **User Management**
- View all users in Authentication → Users
- Manually confirm users if needed
- Reset passwords for users
- Delete or ban problematic users

## 🎯 **Advanced Configuration**

### **Password Requirements**
Configure in **Authentication** → **Settings**:
```
Minimum password length: 6-128 characters
Require uppercase letters: Optional
Require lowercase letters: Optional  
Require numbers: Optional
Require special characters: Optional
```

### **Rate Limiting**
Supabase automatically rate limits:
- Sign up attempts
- Sign in attempts  
- Password reset requests
- Email confirmation requests

### **Custom Email Templates**
Customize in **Authentication** → **Email Templates**:
- Add your branding
- Customize messaging
- Include custom redirect URLs
- Add tracking pixels (if needed)

## 🔧 **Development Tips**

### **Testing with Multiple Emails**
- Use email aliases: `yourname+test1@gmail.com`
- Use temporary email services for testing
- Create test accounts with different scenarios

### **Debugging Authentication**
- Check browser console for errors
- Monitor network requests in DevTools
- Use Supabase logs for server-side debugging
- Test with different browsers and devices

### **Local Development**
- Email confirmations work in development
- Use real email addresses for testing
- Consider using email testing services like Mailtrap

## 🎉 **Success Indicators**

You'll know email authentication is working when:
- ✅ Sign up form accepts email and password
- ✅ Confirmation email is sent and received
- ✅ Clicking confirmation link activates account
- ✅ Sign in works with confirmed credentials
- ✅ User appears in Supabase Authentication → Users
- ✅ User menu shows authenticated state
- ✅ Sign out properly clears session

## 📞 **Getting Help**

If you encounter issues:

1. **Check Supabase Logs**: Dashboard → Logs
2. **Browser Console**: Look for JavaScript errors
3. **Network Tab**: Check API requests and responses
4. **Supabase Discord**: Community support
5. **Documentation**: [Supabase Auth Docs](https://supabase.com/docs/guides/auth)

## 🚀 **Next Steps**

After authentication is working:

1. **User Profiles**: Extend user data with profiles table
2. **Password Reset**: Implement forgot password flow
3. **Email Change**: Allow users to change email addresses
4. **Account Settings**: Build user account management
5. **Cart Sync**: Sync localStorage cart with user account
6. **Order History**: Connect orders to authenticated users

This email-password authentication system provides a solid foundation for your ecommerce application!