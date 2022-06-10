SELECT reservations.id, properties.title, properties.cost_per_night, reservations.start_date, avg(rating) as average_rating
FROM reservations 
JOIN properties ON properties.id = property_id
JOIN property_reviews ON reservations.id = reservation_id 
WHERE reservations.guest_id = 1
GROUP BY reservations.id, properties.title, properties.cost_per_night
ORDER BY reservations.start_date
LIMIT 10;