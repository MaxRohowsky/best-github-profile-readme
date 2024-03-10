$.getJSON('./data.json', function(data) {
    var screenshotContainer = $('#screenshotContainer');
    $.each(data, function(index, item) {
        var card = $('<div>').addClass('card');
        var img = $('<img>').attr('src', item.screenshotPath);
        var info = $('<div>').addClass('card-info');
        var profilePicture = $('<div>').addClass('profile-picture').css('background-image', 'url(' + item.screenshotPath + ')');
        info.append(profilePicture);
        info.append('<p>' + item.firstName + ' ' + item.lastName + '</p>');
        info.append('<a href="' + item.githubRepo + '">GitHub Repo</a>');
        info.append('<a href="' + item.readme + '">Readme</a>');
        var date = new Date(item.timestamp);
        info.append('<p>' + date.toLocaleDateString() + '</p>');
        card.append(img);
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