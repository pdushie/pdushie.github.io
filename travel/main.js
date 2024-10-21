// Get the navicon and the menu
    const navicon = document.getElementById('navicon');
    const menu = document.querySelector('nav ul');

    // Add click event listener to the navicon
    navicon.addEventListener('click', function() {
        // Toggle the display of the menu
        if (menu.style.display === 'block') {
            menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
        }
    });