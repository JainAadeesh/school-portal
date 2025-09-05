# School Portal

A simple Next.js + MySQL mini-project with two pages:
- Add School (`/addSchool`) to insert records with image upload
- Show Schools (`/showSchools`) to list schools like product cards

## Prerequisites
- Node.js 18+
- MySQL 8+

## Setup
1. Create database and table:

```sql
CREATE DATABASE IF NOT EXISTS schooldb;
USE schooldb;
-- Or run the provided schema
```

Or run the schema file:
```bash
mysql -u root -p schooldb < db/schema.sql
```

2. Create `.env.local` in the project root:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_DATABASE=schooldb
DB_PORT=3306
```

3. Install dependencies and run:

```bash
npm install
npm run dev
```

4. Open pages:
- Add: http://localhost:3000/addSchool
- List: http://localhost:3000/showSchools

## Notes
- Uploaded images are saved to `public/schoolImages` and referenced by relative path.
- API: `POST /api/schools` for inserts (multipart/form-data), `GET /api/schools` to list.
