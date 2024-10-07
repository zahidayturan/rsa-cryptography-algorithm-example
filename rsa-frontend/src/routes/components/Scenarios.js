import React, { useState } from 'react';

const scenarios = [
    { id: 1, text: 'Bu senaryoda tek kullanıcı vardır. Kullanıcı elinde bulunan açık anahtar ile sisteme bir dosya yükler bu dosya şifrelenerek kayıt edilir. Daha sonrasında kullanıcı dosyasına erişmek istediğinde dosyanın şifresi çözülerek kullanıcya iletilir.' },
    { id: 2, text: 'Bu senaryoda iki kullanıcı vardır. İlk kullanıcı ikinci kullanıcıya bir dosya gönderir bu dosya şifreli olarak gider, ikinci kullanıcı ise bu şifreli dosyayı şifresi çözülmüş şekilde alır.' },
    { id: 3, text: 'Bu senaryoda üç kullanıcı vardır. Üçüncü kullanıcı hiçbir anahtarı olmadan diğer kullanıcıların dosyalarına erişmek isteyecektir. Aynı zamanda senaryo 1 ve senaryo 2 içerisinde yapılan işlemlere izinsiz erişim sağlayacaktır. Burada şifrelenmiş dosyalarla karşılaşması beklenmektedir.' },
];

const Scenarios = () => {
    const [activeScenario, setActiveScenario] = useState(null);

    return (
        <div className="scenarios">
            <div className="custom-row">
                {scenarios.map((scenario) => (
                    <div
                        key={scenario.id}
                        className={`scenario-button ${activeScenario === scenario.id ? 'active' : ''}`}
                        onClick={() => setActiveScenario(scenario.id)}
                    >
                        <p>Senaryo <span>{scenario.id}</span></p>
                    </div>
                ))}
            </div>
            {activeScenario ? (
                <div>
                    <p>{scenarios.find(scenario => scenario.id === activeScenario)?.text}</p>
                </div>

            ) : (
                <p>Lütfen bir senaryo seçin</p>
            )}
        </div>
    );
};

export default Scenarios;
