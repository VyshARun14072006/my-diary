<<<<<<< HEAD
# my-diary
=======
# My Life Book - Personal Digital Diary

A beautiful, full-featured personal diary application where you can chronicle your daily moments, track your moods, and organize your personal thoughts and memories.

## Features

### Authentication
- Secure signup and login with email/password
- Password hashing and JWT-based authentication via Supabase
- Protected routes ensuring data privacy

### Digital Diary
- Add, edit, and delete daily entries
- Track your mood (Happy, Sad, Neutral, Excited, Anxious, Grateful, Angry, Peaceful)
- Filter entries by mood
- Search through your diary entries
- Timeline view of all entries

### Personal Sections
Nine dedicated sections for different aspects of your life:
- My Happy Moments
- My Sad Moments
- My Likes
- My Dislikes
- My Favorites
- My Wishlist
- My Favorite People
- My Family
- My Good Decisions in Life

Each section supports:
- Adding items with title and description
- Editing existing items
- Deleting items
- Searching within the section

### Dashboard
- Total entries count
- This week's entries count
- Mood distribution visualization
- Recent entries preview
- Motivational quotes

### UI Features
- Soft pastel color theme (pink and blue gradients)
- Responsive design for all devices
- Sidebar navigation
- Modal popups for adding/editing entries
- Smooth animations and transitions
- Mobile-friendly hamburger menu

## Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- Lucide React for icons

**Backend:**
- Supabase (PostgreSQL database)
- Supabase Auth for authentication
- Row Level Security (RLS) for data protection

## Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Clone the repository or download the project files

2. Install dependencies:
```bash
npm install
```

3. The Supabase database is already configured with the environment variables in `.env`

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:
```bash
npm run build
```

The built files will be in the `dist` folder.

### Preview Production Build

To preview the production build locally:
```bash
npm run preview
```

## Database Structure

### Tables

**diary_entries**
- id (uuid, primary key)
- user_id (uuid, references auth.users)
- title (text)
- description (text)
- date (date)
- mood (text)
- created_at (timestamptz)
- updated_at (timestamptz)

**personal_sections**
- id (uuid, primary key)
- user_id (uuid, references auth.users)
- category (text)
- title (text)
- description (text)
- created_at (timestamptz)
- updated_at (timestamptz)

### Security

All tables have Row Level Security (RLS) enabled. Users can only access their own data. Policies are in place for SELECT, INSERT, UPDATE, and DELETE operations.

## Usage

### Creating an Account

1. Click "Sign Up" on the login page
2. Enter your email and password (minimum 6 characters)
3. Confirm your password
4. Click "Sign Up"
5. You can now sign in with your credentials

### Adding a Diary Entry

1. Navigate to "My Diary" in the sidebar
2. Click "New Entry" button
3. Fill in the title, date, mood, and description
4. Click "Create"

### Managing Personal Sections

1. Select any personal section from the sidebar
2. Click "Add Item" to create a new entry
3. Use the Edit or Delete buttons on any card to manage items

### Searching

Use the search bar at the top of any section (except Dashboard) to find specific entries or items.

### Filtering by Mood

In the diary section, use the mood filter buttons to view entries by specific moods or view all entries.

## Project Structure

```
my-life-book/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── Login.tsx
│   │   │   ├── Signup.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── dashboard/
│   │   │   └── Dashboard.tsx
│   │   ├── diary/
│   │   │   ├── DiaryView.tsx
│   │   │   ├── DiaryCard.tsx
│   │   │   └── DiaryModal.tsx
│   │   ├── personal/
│   │   │   ├── PersonalSectionView.tsx
│   │   │   ├── PersonalSectionCard.tsx
│   │   │   └── PersonalSectionModal.tsx
│   │   ├── layout/
│   │   │   ├── MainLayout.tsx
│   │   │   └── Sidebar.tsx
│   │   └── shared/
│   │       └── SearchBar.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── lib/
│   │   └── supabase.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## Customization

### Changing Colors

The app uses a soft pink and blue gradient theme. To customize colors, edit the Tailwind classes in the component files. Main gradient classes used:
- `from-pink-400 to-blue-400` for buttons and headers
- `from-pink-100 via-blue-50 to-pink-50` for backgrounds

### Adding More Moods

Edit the `MOODS` array in `src/lib/supabase.ts` to add or remove mood options.

### Adding More Personal Sections

Edit the `CATEGORIES` object in `src/lib/supabase.ts` and add corresponding menu items in `src/components/layout/Sidebar.tsx`.

## Contributing

This is a personal project template. Feel free to fork and customize it for your own needs.

## License

Free to use for personal and commercial projects.

## Support

For issues or questions, please refer to the Supabase documentation at https://supabase.com/docs
>>>>>>> 7ad475b (deploy to vercel)
