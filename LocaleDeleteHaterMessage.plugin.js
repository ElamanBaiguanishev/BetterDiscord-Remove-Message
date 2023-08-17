/**
 * @name LocaleDeleteHaterMessage
 * @description Локально удаляет сообщения
 * @author Oshava
 * @version 1.0.0
 * @authorLink https://vk.com/yelamani4
*/

const fs = require('fs');
const filePath = 'C:/Users/Elaman/AppData/Roaming/BetterDiscord/plugins/message_black_list.json';

module.exports = class DownloadAvatar {

    start() {
        const observer = new MutationObserver(mutations => {
            let jsonData = {}

            fs.readFile(filePath, 'utf-8', (err, data) => {
                jsonData = JSON.parse(data);
            });

            jsonData["message_ids"].forEach((element) => {
                const to_delete = document.querySelector(`div[data-list-item-id*="${element}"]`);
                if (to_delete) {
                    to_delete.style.display = "none"
                }
            });

            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node instanceof Element) {
                        // alert(node.innerHTML)
                        const parrent_div = node.querySelector('div[class="scroller-nxCRu_ thin-RnSY0a scrollerBase-1Pkza4"]');
                        // alert(parrent_div.innerHTML)
                        const group_1 = parrent_div.querySelectorAll('div[role="group"]')[1]
                        // this.addDiv(group_1)
                        const group_2 = parrent_div.querySelectorAll('div[role="group"]')[2]
                        // alert(group_2.children[0]["id"].replace(/[^+\d]/g, ''))
                        this.addDiv(group_1, group_2.children[0]["id"].replace(/[^+\d]/g, ''))
                    }
                });
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
        this.observer = observer;
    }

    stop() {
        this.observer.disconnect();
    }

    copyNodeContentToClipboard(node) {
        const tempTextarea = document.createElement('textarea');
        tempTextarea.value = node;
        document.body.appendChild(tempTextarea);
        tempTextarea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextarea);
    }

    addDiv(popoutElement, message_id) {
        const newDiv = document.createElement("div");
        const innerDiv = document.createElement("div");

        innerDiv.classList.add("label-3CEiKJ")

        innerDiv.textContent = "Локально удалить сообщение"

        newDiv.classList.add(
            "item-5ApiZt",
            "labelContainer-35-WEd",
            "colorDanger-3umuSx",
            "colorDefault-2_rLdz"
        );
        newDiv.setAttribute("role", "menuitem");
        newDiv.setAttribute("id", "message-actions-delete-locale");
        newDiv.setAttribute("tabindex", "-1");
        newDiv.setAttribute("data-menu-item", "true");

        newDiv.style.cssText = "-webkit-box-sizing: border-box; box-sizing: border-box; margin: 2px 0; border-radius: 2px; font-size: 14px; font-weight: 500; line-height: 18px; cursor: pointer;";

        newDiv.addEventListener("mouseenter", () => {
            newDiv.classList.add("focused-3LIdPu");
        });

        newDiv.addEventListener("mouseleave", () => {
            newDiv.classList.remove("focused-3LIdPu");
        });

        newDiv.addEventListener("click", async () => {
            let jsonData = {}

            fs.readFile(filePath, 'utf-8', (err, data) => {
                jsonData = JSON.parse(data);
                jsonData["message_ids"].push(message_id)
            });

            jsonData["message_ids"].forEach((element) => {
                const to_delete = document.querySelector(`div[data-list-item-id*="${element}"]`);
                if (to_delete) {
                    to_delete.style.display = "none"
                }
            });

            fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8');
        })

        newDiv.appendChild(innerDiv);

        popoutElement.appendChild(newDiv);
    }
};