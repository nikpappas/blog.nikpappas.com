source ~/dev/python/webPython3Env/bin/activate
DIST="out"

for d in ${DIST}/post/* ; do
    echo "$d"
    echo `basename $d`
    gzip -9 -c ${d} | aws s3 cp - s3://blog.nikpappas.com/post/`basename $d` --acl "public-read" --content-encoding "gzip" --content-type "text/html" --profile "papakos_1"
done

gzip -9 -c ./out/sitemap.xml | aws s3 cp - s3://blog.nikpappas.com/sitemap.xml --acl "public-read" --content-encoding "gzip" --content-type "text/xml" --profile "papakos_1"
gzip -9 -c ./out/robots.txt | aws s3 cp - s3://blog.nikpappas.com/robots --acl "public-read" --content-encoding "gzip" --content-type "text/plain" --profile "papakos_1"


# for d in ${DIST}/*.css ; do
#     echo "$d"
#     echo `basename $d`
#     gzip -9 -c ${d} | aws s3 cp - s3://blog.nikpappas.com/`basename $d` --acl "public-read" --content-encoding "gzip" --content-type "text/css" --profile "papakos_1"
# done

# for d in ${DIST}/images/*.jpg ; do
#     echo "$d"
#     if [[ "$d" == *"originals"* ]]; then
#         echo "Ignoring $d."
#     else
#         echo `basename $d`
#         gzip -9 -c ${d} | aws s3 cp - s3://blog.nikpappas.com/images/`basename $d` --acl "public-read" --content-encoding "gzip" --content-type "image/jpeg" --profile "papakos_1"
#     fi
# done

# for d in ${DIST}/images/*.png ; do
#     echo "$d"
#     if [[ "$d" == *"originals"* ]]; then
#         echo "Ignoring $d."
#     else
#         echo `basename $d`
#         gzip -9 -c ${d} | aws s3 cp - s3://blog.nikpappas.com/images/`basename $d` --acl "public-read" --content-encoding "gzip" --content-type "image/png" --profile "papakos_1"
#     fi
# done

# for d in ${DIST}/fonts/*.otf ; do
#     echo "$d"
#     echo `basename $d`
#     gzip -9 -c ${d} | aws s3 cp - s3://blog.nikpappas.com/fonts/`basename $d` --acl "public-read" --content-encoding "gzip" --content-type "font/opentype" --profile "papakos_1"
# done


# gzip -9 -c ${DIST}/index.html | aws s3 cp - s3://cv.nikpappas.com/index.html --acl "public-read" --content-encoding "gzip" --content-type "text/html" --profile "papakos_1"
# gzip -9 -c ${DIST}/script.js | aws s3 cp - s3://cv.nikpappas.com/script.js --acl "public-read" --content-encoding "gzip" --content-type "application/javascript" --profile "papakos_1"
# gzip -9 -c ${DIST}/mainStyle.css | aws s3 cp - s3://cv.nikpappas.com/mainStyle.css --acl "public-read" --content-encoding "gzip" --content-type "text/css" --profile "papakos_1"

#Images not always necessary
# gzip -9 -c images/projects/processed.jpg | aws s3 cp - s3://cv.nikpappas.com/images/projects/processed.jpg --acl "public-read" --content-encoding "gzip" --content-type "image/jpeg" --profile "papakos_1"
