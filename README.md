# Bok
Tjena




## Data

------

### Users
- Email
- Password

- Företagsnamn
- Moms-default


### Payments
- namn
- datum
- summa
- moms
- payment_type : 0 = in / 1 = ut
- ver_id

# Features
----------
**Query interface:**
Keywords

Action:

- Bevaka
- Visa

Finders/Antal

- 5
- senaste
- alla

Typ

- Inbetalningar
- Utbetalningar
- Löneuttag

Where

- Datum ranges
- Summor högre än
- Innehåller

Exempel

- Bevaka utbetalningar som innehåller "mat" 
- Visa senaste utbetalningar där summan är högre än 5000
- Visa alla
- Visa utbetalningar där summan är mellan 1000 och 5000


**Senaste händelser:**
3 senaste sorterat på VER ID.

"Kategorier" genom att skriva [KATEGORI]:[TITEL] i titelfältet
