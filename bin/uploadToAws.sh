source ~/dev/python/webPython3Env/bin/activate
DIST="out"

for d in ${DIST}/post/* ; do
    echo "$d"
    echo `basename $d`
    gzip -9 -c ${d} | aws s3 cp - s3://blog.nikpappas.com/post/`basename "${d%.html}"` --acl "public-read" --content-encoding "gzip" --content-type "text/html" --profile "papakos_1"
done

for d in ${DIST}/*.html ; do
    echo "$d"
    echo `basename $d`
    gzip -9 -c ${d} | aws s3 cp - s3://blog.nikpappas.com/`basename "${d%.html}"` --acl "public-read" --content-encoding "gzip" --content-type "text/html" --profile "papakos_1"
done


# gzip -9 -c ./out/sitemap.xml | aws s3 cp - s3://blog.nikpappas.com/sitemap.xml --acl "public-read" --content-encoding "gzip" --content-type "text/xml" --profile "papakos_1"
# gzip -9 -c ./out/robots.txt | aws s3 cp - s3://blog.nikpappas.com/robots.txt --acl "public-read" --content-encoding "gzip" --content-type "text/plain" --profile "papakos_1"
gzip -9 -c ./out/manifest.json | aws s3 cp - s3://blog.nikpappas.com/manifest.json --acl "public-read" --content-encoding "gzip" --content-type "application/json" --profile "papakos_1"


for d in ${DIST}/*.css ; do
    echo "$d"
    echo `basename $d`
    gzip -9 -c ${d} | aws s3 cp - s3://blog.nikpappas.com/`basename $d` --acl "public-read" --content-encoding "gzip" --content-type "text/css" --profile "papakos_1"
done

# for d in ${DIST}/images/*.jpg ; do
#     echo "$d"
#     if [[ "$d" == *"originals"* ]]; then
#         echo "Ignoring $d."
#     else
#         echo `basename $d`
#         gzip -9 -c ${d} | aws s3 cp - s3://blog.nikpappas.com/images/`basename $d` --acl "public-read" --content-encoding "gzip" --content-type "image/jpeg" --profile "papakos_1"
#     fi
# done

# for d in ${DIST}/images/social/*.jpg ; do
#     echo "$d"
#     echo `basename $d`
#     gzip -9 -c ${d} | aws s3 cp - s3://blog.nikpappas.com/images/social/`basename $d` --acl "public-read" --content-encoding "gzip" --content-type "image/jpeg" --profile "papakos_1"
# done


for d in ${DIST}/images/*.png ; do
    echo "$d"
    if [[ "$d" == *"originals"* ]]; then
        echo "Ignoring $d."
    else
        echo `basename $d`
        gzip -9 -c ${d} | aws s3 cp - s3://blog.nikpappas.com/images/`basename $d` --acl "public-read" --content-encoding "gzip" --content-type "image/png" --profile "papakos_1"
    fi
done

# for d in ${DIST}/images/*.svg ; do
#     echo "$d"
#     if [[ "$d" == *"originals"* ]]; then
#         echo "Ignoring $d."
#     else
#         echo `basename $d`
#         gzip -9 -c ${d} | aws s3 cp - s3://blog.nikpappas.com/images/`basename $d` --acl "public-read" --content-encoding "gzip" --content-type "image/svg+xml" --profile "papakos_1"
#     fi
# done

# aws s3 cp ./out/videos/gravity-simulator.mp4 s3://blog.nikpappas.com/videos/gravity-simulator.mp4 --acl "public-read" --content-type "video/mp4" --profile "papakos_1"
# gzip -9 -c ./out/videos/poster-gravity-simulator.jpg | aws s3 cp - s3://blog.nikpappas.com/videos/poster-gravity-simulator.jpg --acl "public-read" --content-encoding "gzip" --content-type "image/jpeg" --profile "papakos_1"

# aws s3 sync ./out/audio s3://blog.nikpappas.com/audio/ --acl "public-read" --content-type "audio/mpeg" --profile "papakos_1"

# for d in ${DIST}/fonts/*.otf ; do
#     echo "$d"
#     echo `basename $d`
#     gzip -9 -c ${d} | aws s3 cp - s3://blog.nikpappas.com/fonts/`basename $d` --acl "public-read" --content-encoding "gzip" --content-type "font/opentype" --profile "papakos_1"
# done
