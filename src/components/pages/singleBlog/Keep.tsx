<Image
              width={800}
              height={600}
              src={featuredImage.data.attributes.url}
              alt={"Featured Image"}
              className={styles.blog__featuredImage}
            />
            <Box className={styles.blog__info}>
              <Typography className={styles.blog__infoText}>
                <SellOutlinedIcon className={styles.blog__infoIcon} />
                {"Category"}
              </Typography>
              <Typography className={styles.blog__infoText}>
                <PermIdentityRoundedIcon
                  className={`${styles.blog__infoIcon} ${styles.blog__infoIcon}`}
                />
                By
                {" Sajib"}
              </Typography>
              {/* <Typography className={styles.newsCart__comment}>
            <ModeCommentOutlinedIcon className={styles.newsCart__infoIcon} />
            {commentCount} Comment
          </Typography> */}
            </Box>
            <Typography className={styles.blog__title}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero
              repudiandae quos quaerat quae itaque.
            </Typography>

            {/* admin info content */}
            <Box className={styles.blog__adminInfo}>
              <AdminInfo
                firstName={firstName}
                lastName={lastName}
                src={authorImage?.data?.attributes?.url}
                date={createdAt}
              />
              <Box sx={{ display: { xs: "none", sm: "initial" } }}>
                <SocialIcon />
              </Box>
            </Box>

            {/* Blog Details Content */}
            <Box className={styles.blog__details}>
              <BlocksRendererComponent content={description} />
            </Box>