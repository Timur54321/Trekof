class Genre {
    constructor(name, strongConnections, moderateConnections, weakConnections)
    {
        this.name = name;
        this.strongConnections = strongConnections;
        this.moderateConnections = moderateConnections;
        this.weakConnections = weakConnections;
    }
};

class RecomSystem {
    constructor(genres)
    {
        this.genres = genres;
    }

    calcInterestScale(genre, scale)
    {
        const currentGenre = this.genres.find(el => el.name == genre);

        if (!currentGenre) return;

        scale[genre] = Math.min(300, scale[genre]+30);

        currentGenre.strongConnections.forEach(el => {
            scale[el] = (scale[el]+25) > 250 ? scale[el] : scale[el] + 25;
        });
        currentGenre.moderateConnections.forEach(el => {
            scale[el] = (scale[el]+20) > 200 ? scale[el] : scale[el] + 20;
        });
        currentGenre.weakConnections.forEach(el => {
            scale[el] = (scale[el]+15) > 150 ? scale[el] : scale[el] + 15;
        });

        // Balancing scale
        let localSum = 0;
        let balanceMultiplier;

        this.genres.forEach(el => localSum+=scale[el.name]);
        if (localSum > 0) balanceMultiplier = 1000/localSum;
        this.genres.forEach(el => scale[el.name] = parseFloat( ( scale[el.name] * balanceMultiplier ).toFixed(4) ) );
    }

    recommendGenre(scale)
    {
        const genreStat = parseFloat((Math.random() * 1000).toFixed(4));
        let localSum = 0, outputGenre;

        outputGenre = this.genres.find(el => {

            if (genreStat >= localSum && genreStat < localSum + scale[el.name])
            {
                return el;
            }

            localSum += scale[el.name];
        });

        return outputGenre.name;
    }

    testFunction()
    {
        console.log(this.genres[0]);
    }
};

const RecommendationSystem = new RecomSystem(
    [
        new Genre("Поп", 
            ["Гиперпоп", "New Wave", "ХипХоп", "R'n'B"],        /* Strong    connection */
            ["EDM", "Рэп", "Электроника", "Рок"],               /* Moderate  connection */
            ["Альтернатива", "Соул", "Панк"]                    /* Weak      connection */
        ),
        new Genre("Гиперпоп",
            ["Поп", "Альтернатива", "Электроника", "Фонк"],     
            ["Хипхоп", "Панк", "R'n'B"],                        
            ["Хардкор", "Инди", "Пост-рок"]                     
        ),
        new Genre("Рок",
            ["Пост-рок", "Метал", "Прогрессивный рок"],                 
            ["New Wave", "Хардкор", "Пост-хардкор", "Альтернатива"],    
            ["Панк", "Пост-панк", "Гиперпоп"]                           
        ),
        new Genre("Пост-рок",
            ["Альтернатива", "Инди", "Пост-панк", "Прогрессивный рок"],     
            ["New Wave", "Ambient", "Ска", "Панк"],                         
            ["Фолк", "Рок", "Постхардкор"]                                  
        ),
        new Genre("Прогрессивный рок",
            ["New Wave", "Электроника", "Панк"],                
            ["Рок", "Соул", "Ambient"],                         
            ["Постпанк", "Пост-рок", "Джаз"]                    
        ),
        new Genre("Инди",
            ["Панк", "Пост-панк", "Альтернатива", "Пост-рок"],              
            ["R'n'B", "Соул", "Джаз", "Фолк"],                              
            ["EDM", "Ambient", "Гиперпоп"]                                  
        ),
        new Genre("Метал",
            ["Рок", "Хардкор", "Альтернатива", "Пост-Хардкор"],              
            ["Прогрессивный рок", "Дабстеп", "Рэп", "Дэтстеп"],                              
            ["EDM", "Электроника", "Гиперпоп"]                                  
        ),
        new Genre("Альтернатива",
            ["Панк", "Гиперпоп", "Пост-рок"],              
            ["Прогрессивный рок", "Электроника", "Рэп"],                              
            ["Хардкор", "Фонк", "Пост-панк"]                                  
        ),
        new Genre("Хардкор",
            ["Метал", "Рок", "Дэтстеп", "Фонк"],              
            ["Рэп", "Гиперпоп", "Рэп", "Фанк"],                              
            ["Пост-хардкор", "Электроника"]                                  
        ),
        new Genre("Пост-хардкор",
            ["Рок", "Прогрессивный рок", "Панк"],              
            ["Фонк", "Гиперпоп", "Рэп"],                              
            ["Хардкор", "Инди", "Электроника"]                                  
        ),
        new Genre("Электроника",
            ["Техно", "Хаус", "Транс"],              
            ["Фонк", "Фанк", "Дабстеп", "EDM"],                              
            ["Дэтстеп", "Ambient", "Гиперпоп", "Рок", "Пост-хардкор"]                                  
        ),
        new Genre("Техно",
            ["Гиперпоп", "Хаус", "Транс"],              
            ["Фонк", "Фанк", "Дабстеп", "EDM"],                              
            ["Гиперпоп", "Поп", "Ска", "Пост-хардкор"]                                  
        ),
        new Genre("Хаус",
            ["Электроника", "Панк", "Гиперпоп"],              
            ["Техно", "Прогрессивный рок", "Дабстеп"],                              
            ["Пост-панк", "Фолк", "Соул", "Ambient"]                                  
        ),
        new Genre("Транс",
            ["Ambient", "Электроника", "Техно"],              
            ["Инди", "Фолк", "Соул", "Панк"],                              
            ["EDM", "Пост-панк", "Пост-рок"]                                  
        ),
        new Genre("Дабстеп",
            ["Электроника", "Транс", "Техно"],              
            ["Ambient", "Дэтстеп", "Гиперпоп"],                              
            ["Фонк", "Фанк", "Прогрессивный рок"]                                  
        ),
        new Genre("Ambient",
            ["Электроника", "Транс", "Техно"],
            ["Фолк", "Пост-панк", "Алтернатива", "Соул"],     
            ["Пост-рок", "Ска", "Джаз"]
        ),
        new Genre("Фонк",
            ["Фанк", "Электроника", "Альтернатива"],
            ["Поп", "Гиперпанк", "Рок", "Хардкор"],
            ["EDM", "Техно", "New Wave"]
        ),
        new Genre("Фанк",
            ["Фонк", "Электроника", "EDM"],
            ["Поп", "Гиперпанк", "Рок", "Хардкор"],
            ["EDM", "Техно", "New Wave"]
        ),
        new Genre("EDM",
            ["Фонк", "Электроника", "Техно"],
            ["Фанк", "Гиперпанк", "Хип-хоп", "Хаус"],
            ["Прогрессивный рок", "Пост-хардкор", "New Wave"]
        ),
        new Genre("Рэп",
            ["Хип-хоп", "Гиперпоп", "Поп"],
            ["R'n'B", "Панк", "Рок", "Инди"],
            ["Фонк", "Хардкор", "Метал"]
        ),
        new Genre("Хип-хоп",
            ["Поп", "Гиперпоп", "Рэп"],
            ["R'n'B", "Панк", "Рок", "Инди"],
            ["Фонк", "Хардкор", "Метал"]
        ),
        new Genre("R'n'B",
            ["Хип-хоп", "Гиперпоп", "Альтернатива"],
            ["Рэп", "Панк", "Электроника", "New Wave"],
            ["Инди", "Соул", "Поп"]
        ),
        new Genre("Соул",
            ["Джаз", "Поп", "Ambient", "Ска"],
            ["Фолк", "Пост-панк", "Пост-хардкор", "Альтернатива"],
            ["Прогрессивный рок", "Гиперпоп", "New Wave"]
        ),
        new Genre("Джаз",
            ["Соул", "Поп", "Ambient", "Ска"],
            ["Фолк", "Пост-панк", "Пост-хардкор", "Альтернатива"],
            ["Прогрессивный рок", "Гиперпоп", "New Wave"]
        ),
        new Genre("Ска",
            ["Джаз", "Соул", "Поп"],
            ["Пост-рок", "R'n'B", "New Wave"],
            ["Альтернатива", "Инди", "Фолк"]
        ),
        new Genre("Панк",
            ["Пост-панк", "Пост-рок", "Альтернатива", "Ска"],
            ["Соул", "Фолк", "Ambient", "Инди", "Прогрессивный рок"],
            ["Электроника", "Гиперпоп", "Джаз"]
        ),
        new Genre("Пост-панк",
            ["Пост-рок", "Альтернатива", "Инди", "Соул"],
            ["Фолк", "Рок", "Пост-хардкор", "Ска"],
            ["Поп", "Рэп", "New Wave"]
        ),
        new Genre("Фолк",
            ["Инди", "Панк", "Ска", "Соул"],
            ["Альтернатива", "Прогрессивный рок", "Джаз", "Пост-панк"],
            ["Рок", "Пост-хардкор", "Метал"]
        ),
        // !!!!!!!!!!!!!! New Wave +++
    ]
);

module.exports = RecommendationSystem;
