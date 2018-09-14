<!-- Questions -->
1. What is the purpose of using _sessions_?
2. What does bcrypt do to help us store passwords in a secure manner.
3. What does bcrypt do to slow down attackers?
4. What are the three parts of the JSON Web Token?

<!-- Answers -->
1. Sessions are a way of storing specific data for a user. By way of a session ID, a user is given their current session data if there is any.
2. Bcrypt allows us to hash passwords. It also allows us to give it a 'salt', which essentially will just help by adding that text onto our passwords, and then we also can add a cost, which is simply a number of iterations for running the hash.
3. With the salt and the hash so many times over, it makes it so that it can be painstakingly slow for someone malicious to get ahold of a (plain-text) password, even if they manage to get all of your hashed passwords.
4. There is a header, a payload, and a signature in a JWT.
