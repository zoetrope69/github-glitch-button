const DEBUG = true

function getURL() {
  return location.href.replace(/\/+$/, '') // remove trailing slashes
}

function isRepoHomePage() {
  const numberOfPathParts = getURL() 
    .split('/')
    .filter(item => item.length !== 0)
    .length

  const amountOfPathsExpected = numberOfPathParts === 4
  if (!amountOfPathsExpected) {
    return false
  }

  const primaryButtonsElements = document.querySelectorAll('.btn-primary')
  const primaryButtonWithWordCloneInIt = Array.from(primaryButtonsElements)
    .some(element => {
      return element.innerText.toLowerCase().includes('clone')
    })
  
    if (!primaryButtonWithWordCloneInIt) {
    return false
  }

  return true
}

function isPrivate() {
  const labelElement = document.querySelector('.Label.Label--outline')
  const labelHasWordPrivateInIt = labelElement && labelElement.innerText.toLowerCase().includes('private')
  return labelHasWordPrivateInIt
}

function addButtonToPage() {
  const fileNavigationElement = document.querySelector('.file-navigation')

  const repoUrl = `${getURL()}.git`
  const url = `https://glitch.com/edit/#!/remix/clone-from-repo?REPO_URL=${repoUrl}`

  const base64GlitchLogoImage = 'data: image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAA6CAYAAAANzi8+AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAQdEVYdFRpdGxlAGxvZ28tbmlnaHQV/2J9AAAJ1ElEQVRoge2bW2wcVxnHf99eZva + 3mwc45jWF3AhJATaUhWllRAKqaAPBVpogaQxUqWKl6pPUVD7ABW89CEqqBJCCKqoUqlUUoJUoBJUohWIAoWqBB6cWl3Xdovt + BZ71 / HeZj8ezu7Gl73as3Er9SeN9uJzvnPm2zPnnPn / x / ABu4uq + lRVdrsfreLpdAOq + mFVfQUoAFdU9V + q + jNVPamqg51u / z2Jqg6r6tvamHdU9VlVfUBVe3a7zx2nPFLebZKUzTiq + jdVfURVP7nb5 + A6qhpW1dfbTEot / qmq39yNc9jWZKiqHuB64IbyaxAIAWHAAm4HbnOpjwBPicgDLsZzD1X1quqXVPUZVc24MBra5fRu52ADqupR1ftVdXIXkrGZ36nqbaoa6MB5iqreoqrfVVVvw0tJVW8HfgTc7HZHdkgRuAj8BfgT8LKIzG4nkKr2ASPAt4Hh8tfRmolRVT / wA + AUO9zrFItFpqenAfB4PBsOr9e74b3f78fv9yPS9tSnwAXgeeA5EbnYsLBqCPgKcD9wDPBuKhLf0gNVHQaeAW5pt3fl + kxMTNDb24tt2xQKBVKpFCKCqrYUo5Iky7KwbRvbtrEsC7 / f32o3LgDngT8D / xCRtKpGgM8B9wJfBaIN6kc2JEZV7wDONanUlPHxcSzLoq + vD4CpqSmKxSKDg4OUSqUth + M4OI5DoVCgWCxSKBSq79fj9XoJhUIEg0FCoRC2bbfSHQeYA5JAq5n1 + yrvVPUe4NlalQuFAufOneP8 + fMcOHCA06dPY9s2Xu / mEWhIJpNMT0 + Tz + exLItoNMrs7Gz1s8fT2tVZKpXI5XLVI5vNkslkSKfTAPh8PqLRKJFIhGAwWO8S9AIfaqlBw0URMb + Iqt6kqlfqLQWPPfaYYq5jBfTo0aPqOE7dpaNUKunY2JjOz8 + rqmo + n9fR0VFdWlra6aqkjuNoJpPRS5cuaSqV0tHRUR0dHdWxsTGdnZ3VbDa70yYeBhBV9QKvATfWS2FfXx8rKytkMpnqd / Pz8ySTybppn5mZIZvNMjAwAEAqlSIYDNLb29vGj9ecfD5POp0mnU6Ty + UACAQCJBIJotFouxP5InCdiFzxAHfQICkAIyMjzMzMEAiY7UMoFCIcDjdsIRQKkcvlqhOuZVlb5gw3sCyLZDLJwMAA / f39dHV1kc / nmZ6eJpVKsbi4SKlUajXcGyJyBcAHfLFZ6cHBQR566CGy2SwiwuOPP04 + n68mqhaV + adUKuH1eimVSi3PLdslEAgQCATo7u5meXmZpaUl5ubmWFhYIB6Pk0wm686LZfoqb3zAx5o1ODIyQk9PD3feeSeHDx / G7 / cTDAYb1nEcB7iaoGKx2LSOW3g8HhKJBIlEgnQ6zeLiIktLS3g8Hvbu3duo6rCqxkVk2Qc8hVnKPlOvtGVZ3HXXXW11LpfLYVkWYEZNoVCgq6urrRhuEI1GiUajZLPZVvZBHsz + 7SWPiDwnIrdgtv2 / dqtDq6urhEIhALLZLEDDS6 / TBAKBZpdRhRvBXEoAiMjrwD3l5erzO + mE4zjhSCRyMBwOj2M2V / 3JZLLHtu3XMfc52yGCkTY6zTtQ1mPKS3YfcBAYciF4N9CL2ZqDGY154D8uxO40z4vIjK + clK9j5hm3mCsfADZGwJpxMX6nKACXADwi4gC / rXzRARLl18UOxXeTNREpQVlSEJEMZuJ9je3PAfVIA28Day7H7QRhNbLtVs1XVcPArcDHa / 39fcQVYBx4C5gH4hh9 + iPAngb1XhCRybonrqp7gEOYDaDlUmdvBo64FKsWbwFngFFgWkRqCkCqmsQI + cNslVhSIvJi0xGhRs0bBgYwK9dOknQH0N5OsTGzwKvAH4AXReTtdgOo6j7MKPooEANKwE9bvlRUtRd4ADiOWWmE2rKng1maa7EHs5Rvl38DrwB / B14VkfEdxNpCeSQlReRNXwuF + 4DvY8TipuU7TByYAt4FltwMXP7h7wW + oKrfalTQr8YqrStg7TIlVb2gqj9W1S + rats3YqpqqerdqvqCqhbWxR6q5xIcAH4JfLrdxjbjOA4zM2Zvt9klWO8UVARwn2 / bg7IAvAT8CviNiNQdUar6WeAEcB9Q63b7hlrL9X3AzzH3Jm2jqkxNTdHT04Nt2 + TzecbHW58KRKSmS9BIY65BHngZ4zv9FbNsDwBHMbv84XoVy / RudgkexfhJNUdSRQlrJjhtdgkmJydxHIfBwUEcx6npFBSLxapDsP51PT6fr + oQhEKhqqzhMiUgtN4l + CHwaK2Sa2trnD17lqeffppDhw5x5swZgsFgXX1js0sQi8U2uASt / vLNXAK / 308kEmnmErTLqyJixGNV / Vp5MqvJqVOnNrgER44c0VKpbvFr5hKMj493wiW4G4xLEMDsGPfXS2FF2a9MogBzc3MNZcJr6RJURlFFELNtm0QiQSwWa3cUTQBDIlLyYESpukkBePDBB5mYmKgqcLFYjFgs1rCFa + kS7Nmzh / 7 + fgYGBkgkEhSLRWZmZkilUiwsLFT15xZ4q3J37QM + 1az00NAQx48fJ5vNYlkWTz75JKurqw0nv91wCWzbZt++fXR3d7OyssLi4iLz8 / MbXIIm24GqMeBjnWVQjxMnTrB//35OnjzJwYMHcRyn6YhxHKe69IJxCSoacKcREeLxOPF4nNXVVZaWlrh8+TI+n6+hSQj0qWqviEz7gCcwS9Rx6qh4Xq+XY8eOtdW59ap8xbBvYML/Alhtq4EWCYfDhMNhstnsPr/fvwzkmlTpBqZ9IpICHlbVR4DvAN9jh087gHEJKm5lCy7BGJCp90c3CAQCb7ZY1A8bXYJVVX0Co9Ue3kknHMfpisVit4VCoTeAd0XkE3v37h2wbfuPmK37Zpr9iteSHFx1CfYBgxjVblu3ApvowbgEb5Q/34SRTC/UrfHe4VkRWay4BLdiZD+3mC0fYIStCJByMX6nWBORRbjqEvwe+G+HGqvoqwsdiu8m1Y1WxSVwROQVjI2y7HJjGWCS3XMJHOAyrbkfETVSbk2XwIsRwW/i2liinaCA2d6ngAkRyZfPaz9G2x0C6i2RL4nIxUYugbcc5AAtbALfA6xiZM9xYLL6HF0Nyud2HcYpGGDjc4ezInKupTssVY2Xg1wHdHFVBHeAFczlV0nktSIH/A9jwk81UuwaUU5SP8YpuB4zkn7imqFWbuAbmMS5TRpjmlWOORFJd6AdVNUWkZyrTqOaf8S6m9afJs+zdTUsYFzEK5gJe1lEsq51skVct2BV9QaMttpqcs6KSEfuk3aC6zqAiLwJvICZe1qh4UNxu0XHTPvynDOEudXoxtyYVsTeNcz+JgO8JiJzNYN8wAe8b/g/4o38uCbBP/kAAAAASUVORK5CYII='

  const newLink = document.createElement('a')
  newLink.href = url
  newLink.className = 'btn btn-sm'
  newLink.id = 'btn-glitch'
  newLink.innerHTML = `
    <img aria-hidden src='${base64GlitchLogoImage}' />
    Import into Glitch
  `

  fileNavigationElement.append(newLink)

  DEBUG && console.info('[github-glitch-button] Button added to the page')
}

function main() {
  DEBUG && console.info('[github-glitch-button] Loaded')

  const glitchButtonElement = document.querySelector('#btn-glitch')
  if (glitchButtonElement) {
    DEBUG && console.info('[github-glitch-button] Glitch button already on this page')
    return
  }

  if (!isRepoHomePage()) {
    DEBUG && console.info("[github-glitch-button] Isn't the home page")
    return
  }

  if (isPrivate()) {
    DEBUG && console.info('[github-glitch-button] No button private repo')
    return
  }

  addButtonToPage()
}

document.addEventListener('pjax:end', main) // call every time theres a pjax link
main() // call on load of page
