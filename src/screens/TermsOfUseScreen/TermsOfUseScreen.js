import React from 'react';
import {useHeaderHeight} from '@react-navigation/elements';
import {ScrollView, Text, VStack, View} from 'native-base';

import {useLayout} from '../../hooks';
import BackdropLoading from '../../components/loadings/BackdropLoading';

const TermsOfUseScreen = () => {
  const headerHeight = useHeaderHeight();
  const [layout, isLayoutLoading, handleLayout] = useLayout();

  return (
    <View
      flex={1}
      paddingX={6}
      paddingBottom={6}
      onLayout={handleLayout}
      style={{marginTop: headerHeight}}>
      {isLayoutLoading ? (
        <BackdropLoading />
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Text
                fontFamily="DMSans-Bold"
                fontSize="2xl"
                color="myJobCustomColors.burningOrange">
                Điều Khoản & Dịch Vụ
              </Text>
            </View>
            <VStack space={6} mt={5}>
              <View>
                <Text
                  fontFamily="DMSans-Bold"
                  fontSize="lg"
                  color="myJobCustomColors.haitiBluePurple">
                  Chấp Thuận Điều Khoản & Điều Kiện
                </Text>
                <View paddingTop={4}>
                  <Text
                    textAlign="justify"
                    color="myJobCustomColors.mulledWine">
                    Vui lòng đọc kỹ các Điều Khoản & Điều Kiện này trước khi
                    truy nhập và sử dụng dịch vụ trên website đăng tuyển dụng
                    MyJob.com (sau đây gọi là “Website MyJob). Bằng việc truy
                    cập và sử dụng Website MyJob, bạn (sau đây có thể được gọi
                    là “bạn” hoặc “Khách hàng”, trừ phi ngữ cảnh yêu cầu khác
                    đi) chấp thuận Điều Khoản & Điều Kiện này và đồng ý bị ràng
                    buộc bởi các quy định về sử dụng Dịch vụ trên Website MyJob.
                    Nếu bạn có bất kỳ câu hỏi nào về bản thỏa thuận này, vui
                    lòng liên hệ chúng tôi qua email
                    myjob.contact00000@MyJob.com.
                  </Text>
                </View>
              </View>
              <View>
                <Text
                  fontFamily="DMSans-Bold"
                  fontSize="lg"
                  color="myJobCustomColors.haitiBluePurple">
                  Dịch Vụ Của MyJob
                </Text>
                <View paddingTop={4}>
                  <VStack space={2}>
                    <Text
                      textAlign="justify"
                      color="myJobCustomColors.mulledWine">
                      MyJob.com là một trang Web trên mạng Internet được thiết
                      kế cho phép những người sử dụng đăng thông báo tuyển dụng
                      và/hoặc xem các công việc do những người sử dụng khác đăng
                      lên, hoặc tương tác với những người sử dụng khác.
                      MyJob.com do Công ty sở hữu và điều hành. Website MyJob
                      chứa và có thể chứa các thông tin, tin tức, các ý kiến,
                      văn bản, đồ hoạ, các liên kết, sản phẩm nghệ thuật điện
                      tử, hình ảnh động, âm thanh, video, phần mềm, tranh ảnh,
                      âm nhạc, tiếng động và các nội dung, dữ liệu khác (gọi
                      chung là “nội dung”) được định dạng, tổ chức và thu thập
                      dưới nhiều hình thức khác nhau mà người sử dụng có thể
                      truy nhập tới được, gồm các thư mục, cơ sở dữ liệu và các
                      vùng trên website của MyJob.com mà người sử dụng có thể
                      thay đổi được, chẳng hạn như đăng quảng cáo tuyển dụng,
                      tải lên các tệp đa phương tiện, đăng ký các hồ sơ người sử
                      dụng và tạo các hồ sơ tự thông báo (“vùng tương tác”).
                    </Text>
                    <Text
                      textAlign="justify"
                      color="myJobCustomColors.mulledWine">
                      Để có thể sử dụng đầy đủ tiện ích dịch vụ trên Website
                      MyJob, bạn cần phải đăng ký tạo lập một tài khoản sử dụng
                      và cung cấp Website MyJob một số thông tin cá nhân nhất
                      định bao gồm mà không giới hạn bởi địa chỉ email để phục
                      vụ cho việc liên lạc giao tiếp giữa bạn và Website MyJob
                      cũng như những người sử dụng khác sau này. Bằng việc đăng
                      ký này, bạn đồng ý nhận các Thư thông báo, các thư điện
                      tử, tin nhắn, cuộc gọi hoặc các hình thức truyền thông
                      khác về các sản phẩm và dịch vụ của Website MyJob, trong
                      trường hợp luật pháp có đặt ra bất kỳ giới hạn nào về vấn
                      đề này và cho phép các bên thỏa thuận khác đi, bạn đồng ý
                      với Công Ty rằng các giới hạn trên sẽ không được áp dụng.
                      Bất cứ khi nào bạn không mong muốn nhận các thông báo
                      và/hoặc thư điện tử này nữa hoặc muốn thay đổi về các
                      thông tin bạn muốn nhận, thì bạn hãy thông báo cho Website
                      MyJob bằng chức năng có sẵn trên Website MyJob hoặc tại
                      bên dưới của các thư điện tử của Website MyJob. Các thông
                      tin cá nhân của bạn sẽ được bảo quản và xử lý một cách bảo
                      mật theo Chính Sách Bảo Mật của Website MyJob.
                    </Text>
                    <Text
                      textAlign="justify"
                      color="myJobCustomColors.mulledWine">
                      Bạn có thể đặt mua sử dụng các dịch vụ hoặc sản phẩm với
                      các mức giá niêm yết có sẵn trên Website MyJob và việc đặt
                      mua này của bạn sẽ tùy thuộc vào chấp thuận một phần hoặc
                      toàn bộ điều kiện đặt hàng này của Website MyJob. Việc
                      chấp thuận này của Website MyJob chỉ có hiệu lực ràng buộc
                      khi bạn đã thanh toán hoặc các thông tin về thanh toán của
                      bạn đã được xác nhận.
                    </Text>
                    <Text
                      textAlign="justify"
                      color="myJobCustomColors.mulledWine">
                      Công ty bảo lưu quyền thay đổi các dịch vụ, sản phẩm, biểu
                      giá và phương thức tính giá và các thay đổi khác của
                      Website MyJob từng thời gian mà không phải thông báo trước
                      cho người sử dụng nếu thấy phù hợp.
                    </Text>
                    <Text
                      textAlign="justify"
                      color="myJobCustomColors.mulledWine">
                      Công ty bảo lưu quyền từ chối cung cấp dịch vụ cho các cá
                      nhân, tổ chức, mà theo quy định của pháp luật hoặc theo
                      toàn quyền đánh giá của Công ty:
                    </Text>
                    <VStack pl={2} space={2}>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        1. Có hoạt động kinh doanh cùng lĩnh vực, nghành nghề
                        với Công ty, bao gồm nhưng không giới hạn, các hoạt động
                        kinh doanh dịch vụ việc làm thông qua website, ứng dụng
                        thương mại điện tử bán hàng và/hoặc website, ứng dụng
                        cung cấp dịch vụ thương mại điện tử (sàn giao dịch
                        thương mại điện tử); và/hoặc
                      </Text>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        2. Vận hành, quản lý website, ứng dụng liên quan đến
                        tuyển dụng, dịch vụ việc làm tương tự nền tảng website,
                        ứng dụng của Công ty nhằm mục đích kinh doanh, thu lợi
                        nhuận; và/hoặc
                      </Text>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        3. Khai thác, sử dụng các thông tin được cung cấp bởi
                        dịch vụ của Công ty không nhằm phục vụ cho mục đích
                        tuyển dụng cho chính cá nhân, tổ chức đó; và/hoặc
                      </Text>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        4. Cung cấp các sản phẩm, dịch vụ mang tính chất cạnh
                        tranh với các dịch vụ hiện có của MyJob.
                      </Text>
                    </VStack>
                    <Text
                      textAlign="justify"
                      color="myJobCustomColors.mulledWine">
                      Trường hợp, Công ty đã cung cấp dịch vụ cho bạn và/hoặc
                      công ty bạn nhưng sau đó phát hiện ra bạn và/hoặc công ty
                      bạn thuộc một trong các đối tượng mà Công ty từ chối cung
                      cấp dịch vụ nêu trên, thì tùy theo quyết định của Công ty
                      sẽ tiến hành:
                    </Text>
                    <VStack pl={2} space={2}>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        1. Chấm dứt cung cấp dịch vụ và thông báo cho Khách
                        hàng,
                      </Text>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        2. Gỡ bỏ toàn bộ tin đăng tuyển (nếu có),
                      </Text>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        3. Gỡ bỏ, vô hiệu hóa tài khoản sử dụng website MyJob
                        nếu xét thấy cần thiết
                      </Text>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        4. Hoàn trả lại khoản tiền mà bạn đã thanh toán (nếu có)
                        tương ứng với khối lượng dịch vụ mà Công ty chưa cung
                        cấp và/hoặc bạn chưa kích hoạt sử dụng.
                      </Text>
                    </VStack>
                  </VStack>
                </View>
              </View>
              <View>
                <Text
                  fontFamily="DMSans-Bold"
                  fontSize="lg"
                  color="myJobCustomColors.haitiBluePurple">
                  Điều Khoản Về Sử Dụng Dịch Vụ
                </Text>
                <View paddingTop={4}>
                  <VStack space={2}>
                    <VStack pl={2} space={2}>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        1. Chấm dứt cung cấp dịch vụ và thông báo cho Khách
                        hàng,
                      </Text>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        2. Gỡ bỏ toàn bộ tin đăng tuyển (nếu có),
                      </Text>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        3. Gỡ bỏ, vô hiệu hóa tài khoản sử dụng website MyJob
                        nếu xét thấy cần thiết
                      </Text>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        4. Hoàn trả lại khoản tiền mà bạn đã thanh toán (nếu có)
                        tương ứng với khối lượng dịch vụ mà Công ty chưa cung
                        cấp và/hoặc bạn chưa kích hoạt sử dụng.
                      </Text>
                    </VStack>
                  </VStack>
                </View>
              </View>
              <View>
                <Text
                  fontFamily="DMSans-Bold"
                  fontSize="lg"
                  color="myJobCustomColors.haitiBluePurple">
                  Các Vùng Tương Tác
                </Text>
                <View paddingTop={4}>
                  <VStack space={2}>
                    <Text
                      textAlign="justify"
                      color="myJobCustomColors.mulledWine">
                      Bạn thừa nhận, Website MyJob có thể chứa các vùng tương
                      tác khác nhau, bao gồm nhưng không hạn chế với các công
                      việc. Những vùng tương tác này cho phép phản hồi đến
                      Website MyJob và tương tác thời gian thực giữa những người
                      sử dụng. Bạn cũng hiểu rằng, Website MyJob không kiểm soát
                      các thông báo, thông tin hoặc các tệp được phân phối tới
                      các vùng tương tác như vậy và rằng, Website MyJob có thể
                      cho bạn và những người sử dụng khác khả năng tạo và quản
                      lý một vùng tương tác. Tuy nhiên, Website MyJob, công ty
                      mẹ, hoặc các chi nhánh, cũng như các giám đốc, nhân viên,
                      những người làm thuê và các đại lý tương ứng không chịu
                      trách nhiệm về nội dung trong vùng tương tác bất kỳ.
                    </Text>
                    <Text
                      textAlign="justify"
                      color="myJobCustomColors.mulledWine">
                      Việc sử dụng và/hoặc quản lý một vùng tương tác của bạn sẽ
                      bị chi phối bởi Bản thoả thuận này và các quy tắc bổ sung
                      bất kỳ, hoặc bởi các thủ tục hoạt động của vùng tương tác
                      bất kỳ do bạn hay người sử dụng khác thiết lập. Bạn công
                      nhận rằng, Website MyJob không thể và không có ý định sàng
                      lọc các thông tin trước. Ngoài ra, vì Website MyJob khuyến
                      khích liên lạc mở và không thiên vị trong các vùng tương
                      tác nên Website MyJob không thể xác định trước mức độ
                      chính xác hoặc sự phù hợp đối với bản Thoả thuận này về
                      nội dung bất kỳ được chuyển đi trong vùng tương tác.
                      Website MyJob không chịu trách nhiệm với việc sàng lọc,
                      lập chính sách, hiệu chỉnh, duyệt hoặc giám sát nội dung
                      bất kỳ trong một vùng tương tác.
                    </Text>
                    <Text
                      textAlign="justify"
                      color="myJobCustomColors.mulledWine">
                      Mặc dù vậy, bạn cũng đồng ý rằng Website MyJob có quyền
                      giám sát mọi vùng tương tác, đôi lúc để lộ thông tin nào
                      đó nếu cần thiết theo yêu cầu luật pháp, hoặc yêu cầu khác
                      của chính phủ đối với hoạt động của vùng tương tác, hoặc
                      để tự bảo vệ mình hay những người sử dụng khác. Nếu được
                      thông báo nội dung dẫn ra không phù hợp với bản Thỏa thuận
                      này, Website MyJob có thể thận trọng điều tra và xác định
                      để loại bỏ, hoặc yêu cầu người sử dụng bỏ nội dung đó.
                      Website MyJob giữ quyền cấm các hành động, truyền đạt tin
                      tức hoặc nội dung trong phạm vi vùng tương tác, hoặc soạn
                      thảo, từ chối gửi, hoặc loại bỏ nội dung bất kỳ, toàn thể
                      hay từng phần mà với đặc quyền của mình, chúng tôi cho
                      rằng (i) vi phạm các điều khoản tiêu chuẩn lúc đó của bản
                      Thỏa thuận này hoặc chuẩn bất kỳ khác nằm trong chính sách
                      của MyJob.com vẫn còn hiệu lực vào lúc đó, (ii) bất lợi
                      với các quyền của mọi người sử dụng, của Website MyJob
                      hoặc các nhóm thứ ba khác, (iii) vi phạm luật hiện hành
                      hoặc (iv) những điều không hay khác.
                    </Text>
                  </VStack>
                </View>
              </View>
              <View>
                <Text
                  fontFamily="DMSans-Bold"
                  fontSize="lg"
                  color="myJobCustomColors.haitiBluePurple">
                  Tuân Thủ Và Xử Lý Vi Phạm
                </Text>
                <View paddingTop={4}>
                  <VStack space={2}>
                    <Text
                      textAlign="justify"
                      color="myJobCustomColors.mulledWine">
                      Bạn phải tuân thủ đúng các quy định tại Đơn đặt hàng, Hợp
                      đồng Dịch vụ, bản Điều khoản & Điều kiện này như là điều
                      kiện tiên quyết cho việc sử dụng Dịch vụ. Trường hợp bạn
                      vi phạm bất kỳ quy định nêu tại Đơn đặt hàng, Hợp đồng
                      Dịch vụ và bản Điều Kiện & Điều Khoản này, thì chúng tôi
                      có quyền gỡ bỏ mọi đăng tuyển, nội dung hoặc đường dẫn của
                      bạn hoặc gỡ bỏ, vô hiệu hóa tài khoản sử dụng website
                      MyJob nếu xét thấy cần thiết và tạm dừng và/hoặc
                      chấm dứt việc cung cấp dịch vụ mà không phải trả lại Phí
                      Dịch vụ hoặc số tiền dịch vụ mà bạn đã thanh toán nhưng
                      chưa sử dụng hết. Đồng thời, chúng tôi có quyền buộc bạn
                      bồi thường thiệt hại hoặc mất mát phát sinh từ vi phạm của
                      bạn.
                    </Text>
                  </VStack>
                </View>
              </View>
              <View>
                <Text
                  fontFamily="DMSans-Bold"
                  fontSize="lg"
                  color="myJobCustomColors.haitiBluePurple">
                  Bồi Thường
                </Text>
                <View paddingTop={4}>
                  <VStack space={2}>
                    <Text
                      textAlign="justify"
                      color="myJobCustomColors.mulledWine">
                      Bạn đồng ý trả tiền và miễn cho Website MyJob, công
                      ty mẹ hoặc công ty con và các chi nhánh, các giám đốc,
                      nhân viên, những người làm công và các đại lý của Website
                      MyJob khỏi các trách nhiệm pháp lý, khiếu kiện và
                      các phí tổn, kể cả các phí hợp lý cho luật sư, nảy sinh từ
                      sự vi phạm bản Thỏa thuận này, từ chính sách bất kỳ khác,
                      từ việc bạn sử dụng hay truy cập Website MyJob hoặc
                      site internet đựơc kết nối đến hoặc từ Website
                      MyJob, hoặc về việc truyền nội dung bất kỳ trên
                      Website MyJob. bạn.
                    </Text>
                  </VStack>
                </View>
              </View>
              <View>
                <Text
                  fontFamily="DMSans-Bold"
                  fontSize="lg"
                  color="myJobCustomColors.haitiBluePurple">
                  Bảo Mật
                </Text>
                <View paddingTop={4}>
                  <VStack space={2}>
                    <Text
                      textAlign="justify"
                      color="myJobCustomColors.mulledWine">
                      Bạn đồng ý với cam kết bảo mật thông tin liên quan đến
                      Dịch vụ, việc thực hiện giao dịch, và/hoặc bất kỳ thông
                      tin khác thu thập được từ việc thực hiện giao dịch. Bạn sẽ
                      hợp tác ngăn chặn và chống lại hành vi của bất kỳ bên thứ
                      ba nào sao chép và sử dụng trái phép nội dung đăng tuyển
                      hoặc thông tin khác của bạn trên Internet. Bạn không được
                      tiết lộ, chia sẻ hoặc bán các thông tin về ứng viên mà
                      mình thu thập được từ việc sử dụng dịch vụ cho bất kỳ một
                      bên thứ ba nào khác dưới mọi hình thức mà không được sự
                      đồng ý trước bằng văn bản của Công Ty. Ngoài ra, Khách
                      Hàng có trách nhiệm bảo mật tài khoản và mật khẩu, và chỉ
                      sử dụng tài khoản cho mục đích tuyển dụng của mình theo
                      thỏa thuận quy định tại Đơn đặt hàng/Hợp đồng Dịch vụ.
                    </Text>
                  </VStack>
                </View>
              </View>
              <View>
                <Text
                  fontFamily="DMSans-Bold"
                  fontSize="lg"
                  color="myJobCustomColors.haitiBluePurple">
                  Các Vấn Đề Khác
                </Text>
                <View paddingTop={4}>
                  <VStack space={2}>
                    <Text
                      textAlign="justify"
                      color="myJobCustomColors.mulledWine">
                      Bản thoả thuận này bao gồm toàn bộ sự thoả thuận giữa
                      Website MyJob và bạn, và thay thế mọi thoả thuận
                      trước đây về chủ đề này. Website MyJob có thể sửa
                      đổi bản Thoả thuận này hoặc bất kỳ chính sách khác vào bất
                      cứ lúc nào và tùy từng thời điểm, và sự sửa đổi này sẽ tức
                      thì có hiệu lực ngay khi thông báo về sự sửa đổi đó được
                      công bố ở nơi dễ thấy trên Website MyJob.
                    </Text>
                    <Text
                      textAlign="justify"
                      color="myJobCustomColors.mulledWine">
                      Bạn đồng ý xem lại bản Thoả thuận này định kỳ để nhận biết
                      được những điều đã được sửa đổi. Nếu bạn không chấp nhận
                      các sửa đổi này, bạn phải ngưng truy cập Website
                      MyJob. Sự tiếp tục truy cập của bạn và việc sử dụng
                      Website MyJob sau thông báo về mọi sửa đổi như vậy
                      sẽ được xem là sự chấp nhận tất cả các sửa đổi như vậy.
                    </Text>
                    <Text
                      textAlign="justify"
                      color="myJobCustomColors.mulledWine">
                      Nếu điều khoản bất kỳ của bản Thoả thuận này hoặc của mọi
                      chính sách khác không có hiệu lực hoặc không thể thực hiện
                      được, thì phần nội dung đó sẽ được giải thích theo luật
                      hiện hành gần nhất có thể để phản ánh mục đích ban đầu của
                      các bên và các phần còn lại sẽ tiếp tục có đầy đủ hiệu
                      hiệu lực. Việc Website MyJob không thể đòi hỏi hoặc
                      buộc thực hiện chặt chẽ mọi điều khoản của bản Thoả thuận
                      này sẽ không được coi là sự khước từ điều khoản hay quyền
                      bất kỳ. Bản Thoả thuận này sẽ được điều chỉnh bởi các luật
                      của bang hay tỉnh sở tại của Website MyJob, trừ phi
                      có sự mâu thuẫn các quy tắc của các luật, và bạn và
                      Website MyJob đều phải phục tùng quyền thực thi
                      pháp lý duy nhất của toà án tỉnh hay bang đó.
                    </Text>
                    <Text
                      textAlign="justify"
                      color="myJobCustomColors.mulledWine">
                      Bản Thoả thuận này là dành riêng cho bạn và bạn không thể
                      chuyển các quyền của bạn, hoặc nghĩa vụ cho bất kỳ ai. Tất
                      cả các logo, tên chi nhánh, các sản phẩm, tên thương mại
                      hay các nhãn hiệu dịch vụ xuất hiện ở đây có thể là các
                      tên thương mại hay các nhãn dịchvụ của các chủ sở hữu
                      tương ứng của chúng. Các tham chiếu đến tên thương mại bất
                      kỳ, nhãn hiệu dịch vụ và các liên kết đến hoặc từ Website
                      MyJob đều được thực hiện chặt chẽ để làm rõ và nhận
                      dạng và không cấu thành sự chứng thực của Website
                      MyJob về các sản phẩm, dịch vụ hoặc thông tin do
                      người chủ sở hữu của tên thương mại, nhãn dịch vụ, hoặc
                      liên kết, đề nghị hoặc sự chứng thực của Website
                      MyJob bởi người sở hữu các sản phẩm, dịch vụ hoặc
                      liên kết đó.
                    </Text>
                  </VStack>
                </View>
              </View>
            </VStack>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default TermsOfUseScreen;
