SELECT city, count(reservations) as total_reservation
FROM properties
JOIN reservations ON property_id = properties.id
GROUP BY city
ORDER BY total_reservation DESC;