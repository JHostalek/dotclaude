# Sources

Provenance for `cs-pairs.md`. For people maintaining the skill, the agent does not read this file.

## How the pairs were built

- **Human side.** Short public Czech passages. Each is proven human: published before 30 Nov 2022 (dated post or web.archive.org snapshot), or written by a named author with an editor.
- **Selection.** Professional but spoken register, gets to the point, nothing to cut. Office letters, marketing hype and literary style were rejected. Variety of situations over volume.
- **AI side.** A fresh model received only the medium, the situation and a neutral list of the facts, and wrote the text the way it would by default. No instructions about style.
- **Kept a pair** only when the AI version is clearly worse. Dropped pairs where the two sides came out equal.
- **Edits to human passages.** Typography normalized to the skill's rules: Unicode dashes became spaced hyphens, curly quotes became straight. One phone number removed. Original typos kept. `[…]` marks a cut.

Quotes are short excerpts for study purposes.

## Pair sources

- `osm-odstavka-api`: „[Talk-cz] Odstávka api.openstreetmap.org“, https://lists.openstreetmap.org/pipermail/talk-cz/2016-May/014117.html, Marián Kyral, mailing list talk-cz, 9. 5. 2016. Lidské autorství: datovaný příspěvek v archivu mailing listu, podepsaný autor.
- `osm-sotm-prednasejici`: „[Talk-cz] hledám přednášející na SOTM“, https://lists.openstreetmap.org/pipermail/talk-cz/2018-September/019829.html, Miroslav Suchý, mailing list talk-cz, 13. 9. 2018. Lidské autorství: datovaný příspěvek v archivu, podepsaný autor.
- `osm-pivo-online`: „[talk-cz] Kvartální pivo - online“, https://lists.openstreetmap.org/pipermail/talk-cz/2020-December/023053.html, Marián Kyral (podepsáno Marián a Tom), mailing list talk-cz, 1. 12. 2020. Lidské autorství: datovaný příspěvek v archivu, podepsaní autoři.
- `kosik-zruseni-objednavky`: e-mail Košík.cz zákazníkům, citovaný v článku „Kolaps na zlatou neděli. E-shopy s potravinami nestíhají doručovat“, https://www.seznamzpravy.cz/clanek/kolaps-na-zlatou-nedeli-e-shopy-s-potravinami-nestihaji-dorucovat-85405, Seznam Zprávy, 22. 12. 2019. Lidské autorství: publikováno před 2022, citováno v redakčním článku.
- `fakturoid-zdrazeni`: „Nové ceny všech tarifů od 1. října“, https://www.fakturoid.cz/blog/2022/08/17/nove-ceny-od-1-rijna, Fakturoid s.r.o., 17. 8. 2022. Lidské autorství: datovaný příspěvek publikovaný před 30. 11. 2022.
- `fakturoid-ucetni`: úvodní stránka Fakturoid.cz, sekce „Spokojená účetní“, https://web.archive.org/web/20211218174014/https://www.fakturoid.cz/, Fakturoid s.r.o., snímek z 18. 12. 2021. Lidské autorství: archivní snímek z doby před 11/2022.
- `fakturoid-trvale-prihlaseni`: „Trvalé přihlášení“, https://www.fakturoid.cz/blog/2018/05/31/trvale-prihlaseni, Fakturoid s.r.o., 31. 5. 2018. Lidské autorství: datovaný příspěvek z doby před 2022.
- `slevomat-jak-nakoupit`: „Jak to funguje“, https://web.archive.org/web/20210119212806/https://www.slevomat.cz/jak-to-funguje, Slevomat.cz, snímek z 19. 1. 2021. Lidské autorství: archivní snímek z doby před 11/2022.
- `twisto-jak-to-funguje`: úvodní stránka Twisto.cz, sekce „Jak Twisto funguje?“, https://web.archive.org/web/20201226195416/https://www.twisto.cz/, Twisto payments a.s., snímek z 26. 12. 2020. Lidské autorství: archivní snímek z doby před 11/2022.
- `erouska-nedorazila-sms`: eRouška pro Android, řetězec `no_verification_caption` v `values-cs/strings.xml`, https://github.com/covid19cz/erouska-android/blob/ef6b4712a798c7b2aa4b91c1dd7d21591eae8fcf/app/src/main/res/values-cs/strings.xml, tým eRoušky (COVID19CZ / NAKIT pro MZČR), commit z 22. 4. 2021. Lidské autorství: veřejná historie repozitáře z doby před 2022.
- `erouska-rizikove-setkani`: eRouška pro Android, řetězec `exposure_info_text`, stejný soubor a commit jako výše (https://github.com/covid19cz/erouska-android/blob/ef6b4712a798c7b2aa4b91c1dd7d21591eae8fcf/app/src/main/res/values-cs/strings.xml), 22. 4. 2021. Lidské autorství: veřejná historie repozitáře z doby před 2022.
- `fakturoid-parovani`: "Párování plateb s bankou", Fakturoid podpora, https://web.archive.org/web/20211027152623/https://www.fakturoid.cz/podpora/automatizace/parovani-plateb-s-bankou ; Fakturoid s.r.o.; snímek archivu z 27. 10. 2021, stejná stránka existuje už ve snímku z 11. 12. 2019; důkaz: archivní snímek před 30. 11. 2022
- `seznam-stejna-adresa`: "Časté dotazy k Emailu", oddíl "Někdo má stejnou e-mailovou adresu", Seznam Nápověda, https://web.archive.org/web/20221023080100/https://napoveda.seznam.cz/cz/email/ ; Seznam.cz, a.s.; snímek archivu z 23. 10. 2022; důkaz: archivní snímek před 30. 11. 2022 (ve snímku z 11/2019 oddíl ještě není)
- `seznam-odkazy`: "Nebezpečné odkazy", Seznam Nápověda, https://web.archive.org/web/20211020004942/https://napoveda.seznam.cz/cz/email/nebezpecne-odkazy/ ; Seznam.cz, a.s.; snímek archivu z 20. 10. 2021; důkaz: archivní snímek před 30. 11. 2022
- `naucse-adresar`: "Nastavení prostředí", Začátečnický kurz PyLadies, naucse.python.cz, https://web.archive.org/web/20210517223645/https://naucse.python.cz/course/pyladies/beginners/venv-setup/ ; autor Petr Viktorin ("Pro PyLadies Brno napsal Petr Viktorin, 2014-2018"), licence CC BY-SA 4.0; snímek archivu ze 17. 5. 2021; důkaz: archivní snímek před 30. 11. 2022 a jmenovaný autor
- `juniorguru-cas`: "Jak se naučit programovat?", oddíl "Kolik času potřebuješ", junior.guru, https://web.archive.org/web/20220127090955/https://junior.guru/learn/ ; autor Honza Javorek (junior.guru je jeho autorský projekt); snímek archivu z 27. 1. 2022; důkaz: archivní snímek před 30. 11. 2022 a jmenovaný autor
- `lupa-bankid`: "Bankovní identita je dobrý sluha. Existují ale i důvody, proč ji nechtít", Lupa.cz, https://www.lupa.cz/clanky/bankovni-identita-je-dobry-sluha-existuji-ale-i-duvody-proc-ji-nechtit/ ; autor Kamil Zmeškal; 19. 1. 2021; důkaz: datovaný článek, jmenovaný autor, redakce Lupa.cz
- `jirovsky-vysledek`: "Krizový web s vysokou dostupností za pár hodin", blog Česko.Digital, https://blog.cesko.digital/2020/03/web-mzcr ; autor Václav Jirovský; 20. 3. 2020 (text původně vyšel na serveru Náš WordPress); důkaz: datovaný článek a jmenovaný autor
- `jirovsky-tipy`: "Krizový web s vysokou dostupností za pár hodin", oddíl "Obecné tipy pro podobný web", blog Česko.Digital, https://blog.cesko.digital/2020/03/web-mzcr ; autor Václav Jirovský; 20. 3. 2020; důkaz: datovaný článek a jmenovaný autor
- `praha-obcan-role`: "Portál Pražana – Zkušenosti se zaváděním (Lessons learned)", slide 5, konference ISSS 2021, https://archiv.isss.cz/archiv/2021/download/prezentace/praha_petr.pdf ; autor Ing. Jan Petr, MHMP; 20. 9. 2021; důkaz: datovaná konferenční prezentace před 30. 11. 2022 a jmenovaný autor
- `praha-investice`: "Portál Pražana – Zkušenosti se zaváděním (Lessons learned)", slide 11, konference ISSS 2021, https://archiv.isss.cz/archiv/2021/download/prezentace/praha_petr.pdf ; autor Ing. Jan Petr, MHMP; 20. 9. 2021; důkaz: datovaná konferenční prezentace před 30. 11. 2022 a jmenovaný autor

## Skill attribution

The skill adapts [unslop](https://github.com/backnotprop/pstack/blob/main/skills/unslop/SKILL.md), [wait-what](https://github.com/mattpocock/skills/blob/main/skills/productivity/wait-what/SKILL.md), and Wikipedia's [Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing). The pairs follow [contrastive in-context learning](https://arxiv.org/abs/2401.17390), where a model's own default output serves as the negative example.
