document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("messageForm").onsubmit = function (e) {
        e.preventDefault();
       /** egészítsd ki, gyűjtsd össze a szükséges html elemeket és tárold el őket: name, message, image változókba  
        * ...
       */

        if (message.trim() === "") {
            /**irass ki hibaüznetet 
             * ..
            */
            return;
        }

        let formData = new FormData();
        formData.append("name", name);
        /**fűzd hozzá a content-et és a képet is, persze ha van kép 
         * ..
        */

        fetch("backend/message-process.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.success) {
                loadMessages();
                document.getElementById("name").value = "";
                document.getElementById("message").value = "";
                document.getElementById("image").value = "";
            } else {
                alert("Hiba történt az üzenet elküldésekor.");
            }
        });
    };
    loadMessages();
});

function loadMessages() {
    fetch("backend/get-messages.php")
        .then(response => response.json())
        .then(data => {
            /**egészítsd ki: 
             * töltsd be az üzeneteket az index html oldalra 
             * ..*/
            data.forEach(msg => {
                // Új div létrehozása üzenetkártyának
        let card = document.createElement("div");
        card.classList.add("message-card");
        
        // Beküldő név
        let author = document.createElement("p");
        /**Egészítsd ki: add hozzá az author class-t
         * ...
         */

        author.textContent = msg.name;

                 // Üzenet időpontja
        let timestamp = document.createElement("p");
        /**egészítsd ki: add hozzá a timestamp osztályt az elemhez */
        timestamp.textContent = `Beküldve: ${msg.created_at}`;
         // Üzenet tartalma
         let content = document.createElement("p");
         content.textContent = msg.content;

                if (msg.image_path) {
                    let img = document.createElement("img");
                    img.src = "backend/"+msg.image_path;
                    img.classList.add("message-image");
            card.appendChild(img);
                }
                // Az elemek hozzáadása az üzenetkártyához
        // Ha YouTube linket tartalmaz az üzenet
        let youtubeId = extractYouTubeId(msg.content);
        if (youtubeId) {
            let iframe = document.createElement("iframe");
            /**állítsd be az iframe szélességét 360-ra a magasságot 215-re 
             * ..
            */
            
            iframe.src = "https://www.youtube.com/embed/" + youtubeId;
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            card.appendChild(iframe); // Itt adjuk hozzá az üzenetkártyához
        }

        /*egészítsd ki: fűzd hozzá az elemeket az üzenet kártyához
        ......*/
        

        /* Egészítsd ki: add hozzá a kártyákat az üzenetek konténeréhez
        ....*/
        
            });
        });
}

function extractYouTubeId(url) {
    /* a reguláris kifejezés többféle YouTube URL-formátumot is képes felismerni, és az URL-ből kinyeri a videóazonosítót. A YouTube videóazonosító mindig 11 karakter hosszú, és számokat, nagy- és kisbetűket, valamint aláhúzásjelet (_) és kötőjelet (-) tartalmazhat. Nézzük meg a regex működését részletesen:

(?:https?:\/\/)?: Ez a minta figyeli az http:// vagy https:// protokollt, de az (?:...) szerkezet miatt nem ragadja meg (nem menti el), így opcionális.

(?:www\.)?: Ez a rész a www. előtagot figyeli, de szintén opcionális.

(?:youtube\.com\/(...|v|embed|...)): Ez a rész a különböző YouTube URL-eket vizsgálja. A lehetséges formátumok:

youtube.com/watch?v=VIDEO_ID
youtube.com/v/VIDEO_ID
youtube.com/embed/VIDEO_ID
youtu.be/VIDEO_ID
([a-zA-Z0-9_-]{11}): Ez a rész a videóazonosítót keresi. A videóazonosító 11 karakterből áll, és csak az alfanumerikus karaktereket, aláhúzást és kötőjelet engedélyezi. A zárójelek miatt ez az azonosító el lesz mentve, így a match[1] tartalmazza majd az azonosítót, ha megtalálja. */
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    /*Itt a match függvény a reguláris kifejezést az url-re alkalmazza, és ha talál egyezést, akkor visszaad egy tömböt, amely az első találatot tartalmazza. A match[1] a videóazonosítót fogja tartalmazni, ha az URL-ben megtalálható. */
    return match ? match[1] : null;
}
/* a reguláris kifejezés többféle YouTube URL-formátumot is képes felismerni, és az URL-ből kinyeri a videóazonosítót. A YouTube videóazonosító mindig 11 karakter hosszú, és számokat, nagy- és kisbetűket, valamint aláhúzásjelet (_) és kötőjelet (-) tartalmazhat. Nézzük meg a regex működését részletesen:

(?:https?:\/\/)?: Ez a minta figyeli az http:// vagy https:// protokollt, de az (?:...) szerkezet miatt nem ragadja meg (nem menti el), így opcionális.

(?:www\.)?: Ez a rész a www. előtagot figyeli, de szintén opcionális.

(?:youtube\.com\/(...|v|embed|...)): Ez a rész a különböző YouTube URL-eket vizsgálja. A lehetséges formátumok:

youtube.com/watch?v=VIDEO_ID
youtube.com/v/VIDEO_ID
youtube.com/embed/VIDEO_ID
youtu.be/VIDEO_ID
([a-zA-Z0-9_-]{11}): Ez a rész a videóazonosítót keresi. A videóazonosító 11 karakterből áll, és csak az alfanumerikus karaktereket, aláhúzást és kötőjelet engedélyezi. A zárójelek miatt ez az azonosító el lesz mentve, így a match[1] tartalmazza majd az azonosítót, ha megtalálja. */