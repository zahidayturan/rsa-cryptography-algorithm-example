import React, { useState } from 'react';

const scenarios = [
    { id: 1, text: 'Bu senaryoda tek kullanıcı vardır. Kullanıcı elinde bulunan açık anahtar ile sisteme bir dosya yükler bu dosya şifrelenerek kayıt edilir. Daha sonrasında kullanıcı dosyasına erişmek istediğinde dosyanın şifresi çözülerek kullanıcya iletilir.',path:"/svg/scenario-1.svg" },
    { id: 2, text: 'Bu senaryoda iki kullanıcı vardır. İlk kullanıcı ikinci kullanıcıya bir dosya gönderir bu dosya şifreli olarak gider, ikinci kullanıcı ise bu şifreli dosyayı şifresi çözülmüş şekilde alır.',path:"/svg/scenario-2.svg" },
    { id: 3, text: 'Bu senaryoda üç kullanıcı vardır. Üçüncü kullanıcı hiçbir anahtarı olmadan diğer kullanıcıların dosyalarına erişmek isteyecektir. Aynı zamanda senaryo 1 ve senaryo 2 içerisinde yapılan işlemlere izinsiz erişim sağlayacaktır. Burada şifrelenmiş dosyalarla karşılaşması beklenmektedir.',path:"/svg/scenario-3.svg" },
];

const Scenarios = () => {
    const [activeScenario, setActiveScenario] = useState(null);

    return (
        <div className="scenarios">
            <div className="custom-row wrap-row">
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
                    <img src={scenarios.find(scenario => scenario.id === activeScenario)?.path} alt="" width="100%" style={{marginTop:8,maxWidth:600}}/>
                </div>

            ) : (
                <p>Lütfen bir senaryo seçin</p>
            )}
        </div>
    );
};

export default Scenarios;
