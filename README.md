## Description
Online survey platform is a showcase for CRUD using expressjs with vuejs as frontend.

## Setup
1. Install Docker
2. run `docker compose up` at root folder, i.e. the folder with docker-compose.yml

## Usage
### Frontend 
#### Public
http://localhost:3000

#### Admin
http://localhost:3000/admin

### API Backend
http://localhost:3001

API schame refer to the postman collection `OSP.postman_collection.json`

## Todo
- [ ] frontend validation
- [ ] Adding auth for admin page
- [ ] Submit/Delete confirmation
- [ ] improve admin mobile layout

## Bug
- [ ] unstable csv if changed number of questions after first response