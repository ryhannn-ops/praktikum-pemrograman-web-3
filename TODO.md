# Project Restructuring Plan

## Tasks
- [x] Move Footer.tsx from src/app/components/ to src/components/
- [x] Move Navbar.tsx from src/app/components/ to src/components/ (overwrite duplicate)
- [x] Update imports in app/page.tsx to use src/components/
- [x] Replace src/app/page.tsx with content from app/page.tsx
- [x] Replace src/app/layout.tsx with content from app/layout.tsx
- [x] Replace src/app/globals.css with content from app/globals.css
- [x] Delete src/app/components/ directory
- [x] Delete root app/ directory
- [x] Test the application to ensure it runs correctly

## Dependent Files
- app/page.tsx
- app/layout.tsx
- app/globals.css
- src/app/page.tsx
- src/app/layout.tsx
- src/app/globals.css
- src/app/components/Footer.tsx
- src/app/components/Navbar.tsx
- src/components/Navbar.tsx

## Followup Steps
- [x] Run `npm run dev` to test the application
- [x] Check for any import errors or missing files
