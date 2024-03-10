$.getJSON('./data.json', function(data) {
    var screenshotContainer = $('#screenshotContainer');
    $.each(data, function(index, item) {
        var card = $('<div>').addClass('card');
        var img = $('<img>').attr('src', item.screenshotPath);
        card.append(img); // Append the image to the card first

        var info = $('<div>').addClass('card-info');
        
        var profilePicture = $('<div>').addClass('profile-picture').css('background-image', 'url(' + item.screenshotPath + ')');
        info.append(profilePicture);
        
        var name = $('<p>').attr('id', 'name').text(item.firstName + ' ' + item.lastName);
        info.append(name);
        
        var githubRepo = $('<a>')
        .attr('id', 'githubRepo')
        .attr('href', item.githubProfile)
        .attr('title', 'GitHub Profile') 
        .html('<i class="fab fa-github"></i>');
        info.append(githubRepo);
        
        var readme = $('<a>')
        .attr('id', 'readme')
        .attr('href', item.githubReadme)
        .html('<i class="fas fa-book"></i>')
        .attr('title', 'Readme.md');
        info.append(readme);
        
        //var date = new Date(item.timestamp);
        //var timestamp = $('<p>').attr('id', 'timestamp').text(date.toLocaleDateString());
        //info.append(timestamp);
        
        card.append(info);
        
        screenshotContainer.append(card);
    });
}).fail(function(jqxhr, textStatus, error) {
    console.error('Error:', error);
});

fetch('https://api.github.com/repos/maxontech/best-github-profile-readme')
    .then(response => response.json())
    .then(data => {
        document.getElementById('forks').textContent = data.forks_count;
        document.getElementById('stars').textContent = data.stargazers_count;
    });