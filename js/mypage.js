console.log('마이페이지 연결 확인')

// 프로필사진을 누르면 해당 유저의 페이지로 이동
function authorMyPage(user_id) {
    console.log(user_id)
    window.location.href = `${frontend_base_url}/doc/mypage.html?user_id=${user_id}`
}

// 상세페이지로 이동
function articleDetail(article_id) {
    console.log(article_id)
    window.location.href = `${frontend_base_url}/doc/detail.html?article_id=${article_id}`
}

window.onload = async function getUser() {
    const urlParams = new URLSearchParams(window.location.search);
    user_id = urlParams.get('user_id');
    const response = await fetch(`${backend_base_url}/users/mypage/${user_id}`, {
    })
    if (response.status == 200) {
        const response_json = await response.json()
        console.log(response_json)
        // console.log(response_json.profile_image)
        // 유저 프로필 정보 
        const userNickName = document.getElementById('user-nickname')
        const userEmail = document.getElementById('user-email')
        userNickName.innerText = response_json.nickname
        userEmail.innerText = response_json.email

        // 유저 프로필 사진 정보
        const userProfileImage = document.getElementById('user-profile-image')
        if (response_json.profile_image) {
            const profile = document.createElement("img")
            profile.setAttribute("src", `${backend_base_url}${response_json.profile_image}`)
            userProfileImage.append(profile)
        } else {
            const profile = document.createElement("img")
            profile.setAttribute("src", `${backend_base_url}${NoImage}`)
            userProfileImage.append(profile)
        }

        // 팔로잉, 팔로우 정보
        const userFollowersCount = document.getElementById('user-followers-count')
        const userFollowingCount = document.getElementById('user-following-count')
        const userFollowingList = document.getElementById('user_following_list')
        userFollowersCount.innerText = response_json.followers_count
        userFollowingCount.innerText = response_json.following_count

        response_json.following_list.forEach(user_following => {
            console.log(user_following)
            // 페이지 이동
            const user_newCol = document.createElement("div");
            user_newCol.setAttribute("class", "col");
            user_newCol.setAttribute("onclick", `authorMyPage(${user_following.id})`)
            // 유저 정보
            const user_newCard = document.createElement("div");
            user_newCard.setAttribute("class", "card");
            user_newCard.setAttribute("id", user_following.id);
            // 유저 이름
            const user_name = document.createElement("div");
            user_newCard.setAttribute("class", "row");
            user_newCard.setAttribute("id", user_following.nickname);

            user_newCol.appendChild(user_newCard)
            user_name.innerText = user_following.nickname

            // 유저 프로필이미지
            const userImage = document.createElement("img")
            userImage.setAttribute("class", "card-img-top")
            if (userImage.image) {
                userImage.setAttribute("src", `${backend_base_url}${user_following.profile_image}`)
            } else {
                userImage.setAttribute("src", `${noImage}`)
            }

            // append
            user_newCard.appendChild(userImage)
            user_newCard.appendChild(user_name)

            // 카드 append
            userFollowingList.appendChild(user_newCol)
        })

        // 유저 게시글 정보
        const userArticles = document.getElementById('user_article_list')

        response_json.user_articles.forEach(article => {
            console.log(article)
            const newCol = document.createElement("div");
            newCol.setAttribute("class", "col");
            newCol.setAttribute("onclick", `articleDetail(${article.id})`)
            const newCard = document.createElement("div");
            newCard.setAttribute("class", "card");
            newCard.setAttribute("id", article.id);

            newCol.appendChild(newCard)

            const articleImage = document.createElement("img")
            articleImage.setAttribute("class", "card-img-top")
            if (article.image) {
                articleImage.setAttribute("src", `${backend_base_url}${article.image}`)
            } else {
                articleImage.setAttribute("src", `${noImage}`)
            }
            newCard.appendChild(articleImage)

            userArticles.appendChild(newCol)
        })
        return response_json
    } else {
        alert(response.status)
    }
}

// 유저 정보 수정페이지로 이동
async function myPageFixing(user_id) {
    console.log(user_id)
    window.location.href = `${frontend_base_url}/doc/mypagefix.html?user_id=${user_id}`
}


// 팔로우버튼
async function onClickFollowing() {
    const response = await fetch(`${backend_base_url}/users/${JSON.parse(payload).user_id}/`, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        method: 'POST'
    })
    console.log(response)
    if (response.status == 200) {
        alert("팔로우 하셨습니다")
        location.reload()

    } else if (response.status == 202) {
        alert("팔로우를 취소하셨습니다")
        location.reload()
    }
}