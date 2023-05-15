import dayjs from 'dayjs';
import {salaryString} from './customData';

const cvHtmlString = (allConfig, profileDetail) => {
  const avatarUrl = profileDetail?.user?.avatarUrl;
  const fullName = profileDetail?.user?.fullName;
  let birthday = profileDetail?.jobSeekerProfile?.birthday;
  birthday = birthday
    ? dayjs(profileDetail?.jobSeekerProfile?.birthday).format('DD-MM-YYYY')
    : '---';
  const email = profileDetail?.user?.email;
  const phone = profileDetail?.jobSeekerProfile?.phone || '---';
  const career = allConfig?.careerDict[profileDetail?.career] || '---';
  const city = allConfig?.cityDict[profileDetail?.city] || '---';
  const position = allConfig?.positionDict[profileDetail?.position] || '---';
  const salary =
    salaryString(profileDetail?.salaryMin, profileDetail?.salaryMax) || '---';
  const academicLevel =
    allConfig?.academicLevelDict[profileDetail?.academicLevel] || '---';
  const experience =
    allConfig?.experienceDict[profileDetail?.experience] || '---';
  const typeOfWorkplace =
    allConfig?.typeOfWorkplaceDict[profileDetail?.typeOfWorkplace] || '---';
  const jobType = allConfig?.jobTypeDict[profileDetail?.jobType] || '---';
  const title = profileDetail?.title || '---';

  let experienceStringList =
    '<span style="color: grayText;">Chưa cập nhật</span>';
  if (profileDetail?.experienceDetails.length > 0) {
    experienceStringList = '';
  }
  for (let i = 0; i < profileDetail?.experienceDetails.length; i++) {
    let startDate = profileDetail?.experienceDetails[i].startDate;
    startDate = startDate ? dayjs(startDate).format('DD-MM-YYYY') : '---';
    let endDate = profileDetail?.experienceDetails[i].endDate;
    endDate = endDate ? dayjs(endDate).format('DD-MM-YYYY') : '---';

    const jobName = profileDetail?.experienceDetails[i].jobName || '---';
    const companyName =
      profileDetail?.experienceDetails[i].companyName || '---';
    const description =
      profileDetail?.experienceDetails[i].description || '---';
    experienceStringList += `
    <table style="border-collapse: collapse; width: 100%; height: 69px;" border="0">
  <tbody>
  <tr style="height: 18px;">
  <td style="width: 100%; height: 17px;"><span style="color: #999999;"><em>${startDate} - ${endDate}</em></span></td>
  </tr>
  <tr style="height: 18px;">
  <td style="width: 100%; height: 18px;"><span style="color: #999999;"><strong>${jobName}</strong></span></td>
  </tr>
  <tr style="height: 18px;">
  <td style="width: 100%; height: 18px;"><strong>${companyName}</strong></td>
  </tr>
  <tr style="height: 18px;">
  <td style="width: 100%; height: 16px;">
  <p>${description}</p>
  </td>
  </tr>
  </tbody>
  </table>
  <div>&nbsp;</div>
    `;
  }

  let educationStringList =
    '<span style="color: grayText;">Chưa cập nhật</span>';
  if (profileDetail?.educationDetails.length > 0) {
    educationStringList = '';
  }
  for (let i = 0; i < profileDetail?.educationDetails.length; i++) {
    let startDate = profileDetail?.educationDetails[i].startDate;
    startDate = startDate ? dayjs(startDate).format('DD-MM-YYYY') : '---';
    let endDate = profileDetail?.educationDetails[i]?.endDate;
    endDate = endDate ? dayjs(endDate).format('DD-MM-YYYY') : 'Hiện tại';

    const degreeName = profileDetail?.educationDetails[i].degreeName || '---';
    const major = profileDetail?.educationDetails[i].major || '---';
    const trainingPlaceName =
      profileDetail?.educationDetails[i].trainingPlaceName || '---';
    const description = profileDetail?.educationDetails[i].description || '---';

    educationStringList += `
    <table style="border-collapse: collapse; width: 100%; height: 72px;" border="0">
    <tbody>
    <tr style="height: 18px;">
    <td style="width: 100%; height: 18px;"><span style="color: #999999;"><em>${startDate} - ${endDate}</em></span></td>
    </tr>
    <tr style="height: 18px;">
    <td style="width: 100%; height: 18px;"><span style="color: #999999;"><strong>${degreeName} - ${major}</strong></span></td>
    </tr>
    <tr style="height: 18px;">
    <td style="width: 100%; height: 18px;"><strong>${trainingPlaceName}</strong></td>
    </tr>
    <tr style="height: 18px;">
    <td style="width: 100%; height: 16px;">
    <p>${description}</p>
    </td>
    </tr>
    </tbody>
    </table>
  <div>&nbsp;</div>
    `;
  }

  let certificateStringList =
    '<span style="color: grayText;">Chưa cập nhật</span>';
  if (profileDetail?.certificates.length > 0) {
    certificateStringList = '';
  }
  for (let i = 0; i < profileDetail?.certificates.length; i++) {
    let startDate = profileDetail?.certificates[i].startDate;
    startDate = startDate ? dayjs(startDate).format('DD-MM-YYYY') : '---';
    let expirationDate = profileDetail?.certificates[i]?.expirationDate;
    expirationDate = expirationDate
      ? dayjs(expirationDate).format('DD-MM-YYYY')
      : 'Hiện tại';

    const dateStr = !expirationDate
      ? 'Không thời hanh'
      : `${startDate} - ${expirationDate}`;

    const name = profileDetail?.certificates[i].name || '---';
    const trainingPlace = profileDetail?.certificates[i].trainingPlace || '---';

    certificateStringList += `
    <table style="border-collapse: collapse; width: 100%; height: 54px;" border="0">
    <tbody>
    <tr style="height: 18px;">
    <td style="width: 100%; height: 18px;"><span style="color: #999999;"><em>${dateStr}</em></span></td>
    </tr>
    <tr style="height: 18px;">
    <td style="width: 100%; height: 18px;"><span style="color: #999999;"><strong>${name}</strong></span></td>
    </tr>
    <tr style="height: 18px;">
    <td style="width: 100%; height: 18px;"><strong>${trainingPlace}</strong></td>
    </tr>
    </tbody>
    </table>
    <div>&nbsp;</div>
    `;
  }

  let languageSkillsStringList =
    '<span style="color: grayText;">Chưa cập nhật</span>';
  if (profileDetail?.languageSkills.length > 0) {
    languageSkillsStringList = '';
  }
  for (let i = 0; i < profileDetail?.languageSkills.length; i++) {
    const name = allConfig?.languageDict[profileDetail?.languageSkills[i].language] || '---';
    const level = profileDetail?.languageSkills[i].level || '---';

    languageSkillsStringList += `
    <p>${name} (${level}/5)</p>
    `;
  }

  let advancedSkillsStringList =
    '<span style="color: grayText;">Chưa cập nhật</span>';
  if (profileDetail?.advancedSkills.length > 0) {
    advancedSkillsStringList = '';
  }
  for (let i = 0; i < profileDetail?.advancedSkills.length; i++) {
    const name = profileDetail?.advancedSkills[i].name || '---';
    const level = profileDetail?.advancedSkills[i].level || '---';

    advancedSkillsStringList += `
    <p>${name} (${level}/5)</p>
    `;
  }

  return `<p><!-- #######  HEY, I AM THE SOURCE EDITOR! #########--></p>
  <h1 style="color: #5e9ca0;"><img style="border-radius: 50%; display: block; margin-left: auto; margin-right: auto;" src="${avatarUrl}" alt="avt" width="138" height="138" /></h1>
  <h1 style="color: #5e9ca0; text-align: center;"><span style="color: #333399;">${fullName}</span></h1>
  <table style="border-collapse: collapse; width: 100%;" border="0">
  <tbody>
  <tr>
  <td style="width: 33.3333%; text-align: left;">Ng&agrave;y sinh: ${birthday}</td>
  <td style="width: 33.3333%; text-align: center;">Email: ${email}</td>
  <td style="width: 33.3333%; text-align: right;">Sđt: ${phone}</td>
  </tr>
  </tbody>
  </table>
  <h2 style="color: #2e6c80;"><span style="color: #333399;">Th&ocirc;ng tin chung</span></h2>
  <table style="height: 162px; width: 100%; border-collapse: collapse;" border="0">
  <tbody>
  <tr style="height: 18px;">
  <td style="width: 38.0989%; height: 18px;">Nghề nghiệp:</td>
  <td style="width: 61.9011%; height: 18px;"><strong>${career}</strong></td>
  </tr>
  <tr style="height: 18px;">
  <td style="width: 38.0989%; height: 18px;">Địa điểm l&agrave;m việc:</td>
  <td style="width: 61.9011%; height: 18px;"><strong>${city}</strong></td>
  </tr>
  <tr style="height: 18px;">
  <td style="width: 38.0989%; height: 18px;">Cấp bậc mong muốn:</td>
  <td style="width: 61.9011%; height: 18px;"><strong>${position}</strong></td>
  </tr>
  <tr style="height: 18px;">
  <td style="width: 38.0989%; height: 18px;">Mức lương mong muốn:</td>
  <td style="width: 61.9011%; height: 18px;"><strong>${salary}</strong></td>
  </tr>
  <tr style="height: 18px;">
  <td style="width: 38.0989%; height: 18px;">Tr&igrave;nh độ học vấn:</td>
  <td style="width: 61.9011%; height: 18px;"><strong>${academicLevel}</strong></td>
  </tr>
  <tr style="height: 18px;">
  <td style="width: 38.0989%; height: 18px;">Kinh nghiệm l&agrave;m việc:</td>
  <td style="width: 61.9011%; height: 18px;"><strong>${experience}</strong></td>
  </tr>
  <tr style="height: 18px;">
  <td style="width: 38.0989%; height: 18px;">Nơi l&agrave;m việc mong muốn:</td>
  <td style="width: 61.9011%; height: 18px;"><strong>${typeOfWorkplace}</strong></td>
  </tr>
  <tr>
  <td style="width: 38.0989%;">H&igrave;nh thức l&agrave;m việc mong muốn:</td>
  <td style="width: 61.9011%;"><strong>${jobType}</strong></td>
  </tr>
  </tbody>
  </table>
  <h2 style="color: #2e6c80;"><span style="color: #333399;">Mục ti&ecirc;u nghề nghiệp:</span></h2>
  <p style="text-align: justify;">${title}</p>
  <h2 style="color: #2e6c80;"><span style="color: #333399;">Kinh nghiệm l&agrave;m việc:</span></h2>
  ${experienceStringList}
  <h2 style="color: #2e6c80;"><span style="color: #333399;">Học vấn:</span></h2>
  
  ${educationStringList}
  <h2 style="color: #2e6c80;"><span style="color: #333399;">Chứng chỉ:</span></h2>
 
   ${certificateStringList}
  <h2 style="color: #2e6c80;"><span style="color: #333399;">Kỹ năng ng&ocirc;n ngữ:</span></h2>
  ${languageSkillsStringList}
  <h2 style="color: #2e6c80;"><span style="color: #333399;">Kỹ năng chuy&ecirc;n m&ocirc;n</span></h2>
  ${advancedSkillsStringList}
  <p>&nbsp;</p>`;
};

export default cvHtmlString;
