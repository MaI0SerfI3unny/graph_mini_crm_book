FROM mongo

COPY authors.json /authors.json
COPY books.json /books.json
COPY helps.json /helps.json
COPY promotes.json /promotes.json
CMD mongoimport --host mongodb --db graph --collection authors --type json --file /authors.json --jsonArray && \
mongoimport --host mongodb --db graph --collection books --type json --file /books.json --jsonArray && \
mongoimport --host mongodb --db graph --collection helps --type json --file /helps.json --jsonArray && \
mongoimport --host mongodb --db graph --collection promotes --type json --file /promotes.json --jsonArray