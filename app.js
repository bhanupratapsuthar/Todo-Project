document.addEventListener('DOMContentLoaded', () => {
            const taskInput = document.getElementById('taskInput');
            const addTaskBtn = document.getElementById('addTaskBtn');
            const taskList = document.getElementById('taskList');
            const emptyMessage = document.getElementById('empty-message');

            // Function to add a task
            const addTask = () => {
                const taskText = taskInput.value.trim();

                if (taskText === '') {
                    // Simple feedback if input is empty
                    taskInput.classList.add('border-red-500');
                    setTimeout(() => {
                         taskInput.classList.remove('border-red-500');
                    }, 1500);
                    return;
                }
                
                // Hide the empty message if it's visible
                if (emptyMessage) {
                    emptyMessage.style.display = 'none';
                }

                // Create list item
                const li = document.createElement('li');
                li.className = 'flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm transition-all duration-300';
                
                // Task content container
                const taskContent = document.createElement('div');
                taskContent.className = 'flex items-center space-x-3';
                
                // Checkbox
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer';

                // Task text span
                const span = document.createElement('span');
                span.textContent = taskText;
                span.className = 'text-gray-800 dark:text-gray-200';

                taskContent.appendChild(checkbox);
                taskContent.appendChild(span);

                // Delete button
                const deleteBtn = document.createElement('button');
                deleteBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400 hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                `;
                deleteBtn.className = 'focus:outline-none';

                // Append elements to list item
                li.appendChild(taskContent);
                li.appendChild(deleteBtn);

                // Add list item to the task list
                taskList.appendChild(li);

                // Clear the input field
                taskInput.value = '';
                taskInput.focus();

                // Add event listener for the checkbox
                checkbox.addEventListener('change', () => {
                    span.classList.toggle('completed');
                    li.classList.toggle('opacity-60');
                });

                // Add event listener for the delete button
                deleteBtn.addEventListener('click', () => {
                    li.classList.add('opacity-0', 'scale-90');
                    setTimeout(() => {
                        li.remove();
                        // Show empty message if list is empty
                        if(taskList.children.length === 1 && taskList.contains(emptyMessage)) {
                             emptyMessage.style.display = 'block';
                        } else if (taskList.children.length === 0 && !taskList.contains(emptyMessage)) {
                            // This case handles when the last item is removed and the empty message was previously removed
                            taskList.appendChild(emptyMessage);
                            emptyMessage.style.display = 'block';
                        }
                    }, 300); // Wait for animation
                });
            };

            // Event listeners
            addTaskBtn.addEventListener('click', addTask);
            taskInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    addTask();
                }
            });
        });