# Front_End_Porject
WhatsApp Clone
A web-based WhatsApp Clone built using HTML, CSS, and JavaScript. This project replicates the core functionality of a messaging application, including chat management, group creation, notifications, and a user profile interface. It features a responsive design, context menu for chat actions, and local storage for persistent settings.
Table of Contents

Features
Demo
Installation
Usage
Project Structure
Technologies Used
Contributing
License

Features

Chat Interface: Send and receive messages with a smooth, animated UI.
Chat List: View recent chats with avatars, last messages, and timestamps.
Context Menu: Right-click or click the ⋮ icon for chat actions like:
Add/Remove from Favorites
Close, Report, Clear, or Delete Chat
Mute Notifications (1 hour, 8 hours, 1 day, 1 week, or forever)


Group Chats: Create groups with multiple contacts.
Community Creation: Organize groups into communities with descriptions.
Profile Page: View and manage user settings, including notifications and privacy.
Search Functionality: Filter chats by name or last message.
Notifications: Desktop notifications for new messages (configurable).
Persistent Settings: Save favorites, muted chats, and settings to local storage.
Responsive Design: Optimized for desktop browsers with smooth transitions.

Demo
To see the application in action, open index.html in a modern web browser (e.g., Chrome, Firefox). The app includes sample chats, including a "Bot AI" that auto-replies to messages.
Installation

Clone the Repository (if hosted on a git platform):
git clone https://github.com/your-username/whatsapp-clone.git
cd whatsapp-clone

Alternatively, download the project files as a ZIP and extract them.

Serve the Application:

The project is a static web app, so you can open index.html directly in a browser.
For development, use a local server to avoid CORS issues:npx http-server

Then navigate to http://localhost:8080.


Dependencies:

No external dependencies are required. All functionality is implemented with vanilla HTML, CSS, and JavaScript.
Ensure the background image (Yoriichi-Tsugikuni-Demon-Slayer-4K-Anime-Wallpaper-1081x608.jpg) is in the project directory or update the CSS to use a different image.



Usage

Open the App:

Launch index.html in a browser.
The sidebar displays the chat list, and the main content shows the active chat.


Interact with Chats:

Click a chat in the sidebar to view messages.
Type in the input field and press Enter or click the send button (→) to send a message.
The "Bot AI" chat auto-replies after 1 second.


Context Menu:

Click the ⋮ icon in the chat header to open the context menu.
Use options to favorite, mute, clear, or delete the chat.
Muted chats suppress notifications for the specified duration.


Create Groups/Communities:

Click the group (👥) or community (🏘️) icon in the header to open modals.
Select contacts or groups and provide a name/description to create.


Profile and Settings:

Click the profile image in the header to view the profile page.
Toggle notification settings and media visibility; changes are saved to local storage.


Search:

Use the search bar to filter chats by name or last message.



Project Structure
whatsapp-clone/
├── index.html                   # Main HTML file containing the app
├── Yoriichi-Tsugikuni-Demon-Slayer-4K-Anime-Wallpaper-1081x608.jpg  # Background image for chat
├── README.md                    # Project documentation


index.html: Contains all HTML, CSS (in <style>), and JavaScript (in <script>). The CSS defines the responsive layout and animations, while the JavaScript handles app logic, including chat management, context menu actions, and local storage.

Technologies Used

HTML5: Structure of the web application.
CSS3: Styling with animations, transitions, and responsive design.
JavaScript (Vanilla): Core functionality, including DOM manipulation, event handling, and local storage.
Local Storage: Persists user settings, favorite chats, and muted chats.

Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit changes (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a Pull Request.

Please ensure code follows the existing style and includes comments for clarity. Test thoroughly before submitting.
License
This project is licensed under the MIT License. See the LICENSE file for details.

