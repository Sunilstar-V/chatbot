# chatbot
A chatbot to read a file and answer the questions

**Approach and Decisions**
The primary goal of this application was to create a chatbot that can provide answers to user queries by parsing various types of files. The key components of this project were the chatbot's brain (the AI model), the backend handling the logic, and the frontend providing a user-friendly interface.

Here's a breakdown of how I approached each part and the reasoning behind the choices I made:

**Choosing the AI Model:** After reviewing several options, I chose OpenAI's GPT-2 model for generating answers. This model boasts impressive capabilities for text generation tasks and has had excellent results in the domain of chatbots. It was an appealing balance between complexity and performance and was also easy to implement using the transformers library.

**Backend Framework:** I used FastAPI for the backend due to its high performance and intuitive syntax. The vast number of resources and the highly supportive community made the development process smoother and quicker.

**File Handling and Storage:** I chose MongoDB as the database, combined with the GridFS system for file handling, as this allowed for robust handling of large files. Storing the file content directly in MongoDB made it easy to later retrieve and use it for predictions.

**Multiple File Type Support:** A significant decision was to add support for multiple file types (.csv, .pdf, .docx, and .txt). While this added more complexity to the file reading process, it greatly enhanced the usability of the application, allowing users to use the chatbot with virtually any text-based dataset.

**Frontend Development:** React.js is known for efficient performance and a vast community of developers, making it an excellent choice for developing the frontend. I wanted to ensure the application is user-friendly, hence I added features like a pop-up to notify users of successful or unsuccessful file uploads.

**Lessons Learned and Final Thoughts**
Building this application presented various challenges, but each became a valuable learning opportunity. I enhanced my practical skills in handling multiple file types in Python, deepened my understanding of managing large files in MongoDB, and learned about developing robust full-stack applications.

**Challenges and Learnings:** One of the significant challenges I faced was offering support for various file types. It was a time-consuming process, involved a lot of trials, but was a great learning opportunity. Also, it was a major improvement from the initial functionality where only .csv files were supported.

I embarked on this journey with limited knowledge but came out on the other side much enriched. The experience strengthened my capabilities to handle different file types in Python, deepened my understanding of MongoDB's file-handling capacities, and educated me on the intricacies of developing a comprehensive full-stack application.
