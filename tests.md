- [X] Usecase: Organize a conference
    - [X] Create a conference
    - [X] The conference must happen in at least 3 days
    - [X] The conference must have a maximum of 1000 seats
    - [X] The conference must have at least 20 seats
    - [X] The conference is too long (> 3 hours)

- [X] Usecase: Change the seats of a conference
    - [X] Change the number of seats
    - [X] The conference must exist
    - [X] The user must be the organizer
    - [X] The seats must be between 20 and 1000
    - [X] The seats must be greater than the number of bookings

- [X] Usecase: Change the dates of a conference
    - [X] Change the dates
    - [X] The conference must exist
    - [X] The user must be the organizer
    - [X] The conference must happen in at least 3 days
    - [X] The duration must be less than 3 hours

- [X] Usecase: Book a seat
    - [X] The conference must exist
    - [X] The conference must have enough seats
    - [X] The user must not have already booked a seat
    - [X] The user must not be the organizer
    - [X] The conference must not have already started
    - [ ] An email must be sent to the user
    - [ ] An email must be sent to the organizer

- [ ] Usecase: Cancel a conference
    - [ ] The conference must exist
    - [ ] The user must be the organizer

- [ ] Evaluation:
    - [X] Finir le test `change-seats.test.ts`: Pas moins de sieges que ceux qui sont deja reserves (50 places - 30
      bookings - pas possible de mettre 25 places)
    - [ ] Faire le usecase `Reserver sa place` et le test unitaires et e2e qui va avec
    - [ ] Tests d'integration pour `mongo-conference-repository`

    - [ ] Extra si vous avez du temps:
        - [ ] Mettre en place l'adapter `Jwt-authenticator`
        - [ ] Faire usecase `Annuler Conference` (Attention aux consequences que ca implique sur les reservations)