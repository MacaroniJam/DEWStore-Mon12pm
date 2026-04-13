# D.E.W Store

D.E.W Store is a browser-based video game storefront built with HTML5, CSS, and JavaScript. The project includes user registration and login, a game catalog, a shopping cart, checkout, invoice viewing, and a dashboard that summarizes registered users by gender and age group.

## Project Type

- Front-end only web application
- No backend or database server required
- Data is stored in the browser with `localStorage` and `sessionStorage`

## Running The Project

## Option 1: Open the project directly

1. Open the repository folder.
2. Navigate to `Codes/`.
3. Open `index.html` in a browser.

## Option 2: Run with VS Code Live Server

1. Open the repository in VS Code.
2. Install the Live Server extension if needed.
3. Right-click `Codes/index.html`.
4. Choose `Open with Live Server`.

## Entry Point

- Main page: `Codes/index.html`

## Login Credentials

There is no hard-coded default account in the repository.

To log in:

1. Open `Codes/index.html`.
2. Select `Register`.
3. Create an account with a unique TRN in the format `000-000-000`.
4. Return to the login page and sign in with the TRN and password you created.

### Demo Test Values

If you need sample values for testing, you can use something like:

- First Name: `Demo`
- Last Name: `User`
- Date of Birth: any valid date that makes the user at least 18
- Gender: any listed option
- Phone Number: `876-555-1234`
- Email: `demo@example.com`
- TRN: `123-456-789`
- Password: `Password123`

## Admin
To utilize the admin function `ShowInvoices()` function ensure to register an account with the following TRN `123-456-789`

## Resetting Test Data

Because the app stores data in the browser, previous test accounts, cart items, and invoices may remain between sessions.

To reset the project state, clear the site's browser storage:

- `localStorage`
- `sessionStorage`

This removes:

- `RegistrationData`
- `AllProducts`
- `cart`
- `AllInvoices`
- `LastInvoiceNumber`
- login/session data

## Main Features

- User registration with validation
- Login with three-attempt lock behavior
- Password reset flow
- Product catalog generated from JavaScript objects
- Cart stored in browser storage
- Checkout with payment method selection
- Invoice generation and invoice history
- Dashboard charts for gender and age distribution

## Group Members 

| Name | ID# |
| Joel Henry | 2300087 |
| Jaydon Hylton | 2210144 |
| Stephen Morgan | 2306623 |
| Micah Lindo | 2505275 |

## Frameworks And Tools Used

### 1. HTML5

Used to structure each page of the website, including forms, navigation, product layouts, checkout sections, invoices, and dashboard canvases.

### 2. CSS3

Used for page layout, responsive styling, typography, forms, navigation, and page-specific visual design.

### 3. Vanilla JavaScript

Used for the application's behavior and logic, including:

- form validation
- registration and login
- shopping cart updates
- checkout processing
- invoice generation
- dashboard calculations
- browser storage handling

### 4. Google Fonts Material Icons

Imported with:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
```

What it is:

- Google's Material Icons web font/icon library
- lets a page render icons by placing icon names inside an element with the `material-icons` class
- commonly used for lightweight UI icons without storing separate image files

How this project uses it:

- password visibility toggle icons such as `visibility` and `visibility_off`
- used on login, registration, reset password, and invoice-related pages

Official references:

- Google Material Icons guide: https://developers.google.com/fonts/docs/material_icons
- Material Icons library: https://fonts.google.com/icons

### 5. Chart.js 2.9.4

Imported with:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
```

What it is:

- a JavaScript charting library for HTML5 canvas
- used to draw charts such as bar, line, pie, radar, and other data visualizations in the browser
- Chart.js 2.9.4 is the specific version loaded by this project from the CDNJS content delivery network

How this project uses it:

- renders the gender distribution bar chart on the dashboard
- renders the age distribution bar chart on the dashboard
- both charts are created in `Codes/Javascript/dashboardScript.js`

Official references:

- Chart.js 2.9.4 docs: https://www.chartjs.org/docs/2.9.4/
- CDNJS package page: https://cdnjs.com/libraries/Chart.js/2.9.4

### 6. Browser Web Storage API

This is not imported with a CDN, but it is one of the project's core browser tools.

What it is:

- `localStorage` stores data that remains after the browser is closed
- `sessionStorage` stores data for the current browser session

How this project uses it:

- `RegistrationData` for registered users
- `cart` for shopping cart items
- `AllInvoices` for generated invoices
- `LastInvoiceNumber` for invoice numbering
- `username`, `loggedIn`, and `currentTRN` for login/session tracking

### 7. Local Font Assets

The project also uses bundled font files:

- `Assets/Fonts/NeueHaasDisplayMedium.ttf`
- `Assets/Fonts/NeueHaasDisplayRoman.ttf`

These are loaded with CSS `@font-face` rules and used throughout the interface styling.

## Project Structure

```text
DEWStore-Mon12pm/
|-- Assets/
|   |-- Fonts/
|   |   |-- NeueHaasDisplayMedium.ttf
|   |   `-- NeueHaasDisplayRoman.ttf
|   `-- Images/
|       |-- COE33Cover.png
|       |-- COE33FullImage.jpg
|       |-- COE33Logo.png
|       |-- COE33Promo.jpg
|       |-- DEWLogo.png
|       |-- GTAVCover.jpg
|       |-- GTAVFullImage.png
|       |-- LOPCover.png
|       |-- LOPFullImage.jpg
|       |-- MHWCover.png
|       |-- MHWFullImage.jpg
|       |-- MHWLogo.png
|       |-- MHWPromo.png
|       |-- RE9Cover.jpg
|       |-- RE9FullImage.jpg
|       |-- RE9Logo.png
|       |-- RE9Promo.jpg
|       `-- VideoGamesCollage.jpg
|-- Codes/
|   |-- Javascript/
|   |   |-- cartScript.js
|   |   |-- checkoutScript.js
|   |   |-- dashboardScript.js
|   |   |-- gameScript.js
|   |   |-- gamesScript.js
|   |   |-- indexScript.js
|   |   |-- invoicesScript.js
|   |   |-- mainScript.js
|   |   |-- registerScript.js
|   |   `-- resetPasswordScript.js
|   |-- accountLocked.html
|   |-- cart.html
|   |-- checkout.html
|   |-- dashboard.html
|   |-- game.html
|   |-- games.html
|   |-- index.html
|   |-- invoices.html
|   |-- register.html
|   `-- resetPassword.html
|-- Styles/
|   |-- CartStyle.css
|   |-- CheckoutStyle.css
|   |-- DashboardStyle.css
|   |-- GameStyle.css
|   |-- GamesStyle.css
|   |-- InvoicesStyle.css
|   |-- LoginStyle.css
|   |-- NavBarStyle.css
|   `-- RegisterStyle.css
|-- Storyboard/
|   |-- Desktop/
|   |-- Mobile/
|   |-- Storyboard.bmpr
|   `-- Storyboard.pptx
|-- Storyboard.pdf
`-- README.md
```
