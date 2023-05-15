import React from 'react';
import {useHeaderHeight} from '@react-navigation/elements';
import {ScrollView, Text, VStack, View} from 'native-base';

import {useLayout} from '../../hooks';
import BackdropLoading from '../../components/loadings/BackdropLoading/BackdropLoading';

const PrivacyPolicyScreen = () => {
  const headerHeight = useHeaderHeight();
  const [layout, isLayoutLoading, handleLayout] = useLayout();

  return (
    <>
      <View
        flex={1}
        paddingX={3}
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
                  Quy Định Bảo Mật
                </Text>
              </View>
              <VStack space={6} mt={5}>
                <View>
                  <Text
                    fontFamily="DMSans-Bold"
                    fontSize="lg"
                    color="myJobCustomColors.haitiBluePurple">
                    Các thông tin có thể nhận dạng cá nhân nào được thu thập từ
                    bạn
                  </Text>
                  <View paddingTop={4}>
                    <VStack space={2}>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        Website MyJob thu thập thông tin theo một số cách từ các
                        mục khác nhau trên website của mình.
                      </Text>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        Một số thông tin cá nhân được tập hợp lại khi bạn đăng
                        ký. Trong khi đăng ký, chúng tôi hỏi tên và địa chỉ
                        email của bạn. Hệ thống cũng có thể hỏi địa chỉ đường
                        phố, thành phố, bang/tỉnh, mã vùng/bưu điện, quốc gia,
                        số điện thoại, thông tin thanh toán và địa chỉ máy (URL)
                        của website của bạn, mặc dù chỉ những trường được đánh
                        dấu sao * trên phần đăng ký mới là thông tin bắt buộc.
                        Website MyJob cũng thu thập hoặc có thể thu thập thông
                        tin nhân khẩu học không chỉ từ riêng bạn như tuổi tác,
                        ưu tiên, giới tính, các mối quan tâm và sở thích. Đôi
                        khi chúng tôi thu thập hoặc có thể thu thập một kết hợp
                        của hai kiểu thông tin. Ngay khi bạn đăng ký, bạn không
                        còn vô danh với Website MyJob nữa, bạn có tên truy cập
                        và có thể khai thác đầy đủ các sản phẩm/dịch vụ của
                        Website MyJob.
                      </Text>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        Ngoài thông tin đăng ký, đôi khi chúng tôi có thể hỏi
                        bạn thông tin cá nhân bao gồm (nhưng không hạn chế) khi
                        bạn đặt đăng quảng cáo tuyển dụng hoặc khai thác các
                        tính năng khác của Website MyJob. Nếu bạn liên lạc với
                        chúng tôi, chúng tôi có thể giữ một bản ghi nhớ về sự
                        liên lạc này.
                      </Text>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        Mỗi trang trong phạm vi Website MyJob đều có đường dẫn
                        tới Chính sách Bảo mật này.
                      </Text>
                    </VStack>
                  </View>
                </View>
                <View>
                  <Text
                    fontFamily="DMSans-Bold"
                    fontSize="lg"
                    color="myJobCustomColors.haitiBluePurple">
                    Cookies là gì và cách chúng được sử dụng
                  </Text>
                  <View paddingTop={4}>
                    <VStack space={2}>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        Là một phần của việc đưa ra và cung cấp các dịch vụ cá
                        nhân và theo yêu cầu khách hàng, Website MyJob có thể
                        dùng các cookie để lưu và đôi khi theo dõi thông tin về
                        bạn. Cookie là một lượng nhỏ dữ liệu được gửi tới trình
                        duyệt của bạn từ máy chủ web và được lưu trên đĩa cứng
                        máy tính của bạn. Một vài tính năng của Website MyJob
                        đòi hỏi bạn chấp nhận các cookie mới có thể sử dụng
                        được. (xem mục “Bạn có những lựa chọn nào khi thu thập,
                        sử dụng và phân phối thông tin của bạn” để có thông tin
                        chi tiết hơn về các cookie). Nói chung, chúng tôi dùng
                        các cookie cho các mục đích sau đây:
                      </Text>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        (1) Nhận dạng và gắn nhãn cho tất cả các công việc “mới”
                        từ lần cuối cùng của bạn ghé thăm website
                      </Text>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        (2) Lưu theo yêu cầu hoặc vĩnh viễn tên truy cập và mật
                        khẩu lên máy của bạn để bạn không phải nhập lại mỗi lần
                        ghé thăm website của chúng tôi
                      </Text>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        (3) Cho phép bạn “kiểm tra danh sách” các công việc mà
                        bạn muốn đánh dấu để giữ lại và xem sau này
                      </Text>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        Các mạng quảng cáo của các công ty đăng việc trên
                        Website MyJob cũng có thể dùng các cookie của riêng họ.
                      </Text>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        Website MyJob cũng sẽ tập hợp và có thể tập hợp thông
                        tin nào đó về việc sử dụng Website MyJob của bạn, chẳng
                        hạn những khu vực bạn ghé thăm và những dịch vụ bạn truy
                        nhập. Ngoài ra, Website MyJob cũng có thể thu thập những
                        thông tin về phần cứng, phần mềm trên máy tính của bạn.
                        Thông tin này có thể bao gồm những không hạn chế địa chỉ
                        IP, kiểu trình duyệt, tên miền, các mục bạn truy nhập và
                        các địa chỉ website tham chiếu.
                      </Text>
                    </VStack>
                  </View>
                </View>
                <View>
                  <Text
                    fontFamily="DMSans-Bold"
                    fontSize="lg"
                    color="myJobCustomColors.haitiBluePurple">
                    Thông tin của bạn được sử dụng như thế nào
                  </Text>
                  <View paddingTop={4}>
                    <VStack space={2}>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        Bằng việc cung cấp thông tin của mình, bạn đồng ý để
                        MyJob Website, các công ty liên kết, đơn vị trực thuộc
                        và các thành viên trực thuộc Navigos Group có thể sử
                        dụng thông tin của bạn, dù đó là thông tin cá nhân, nhân
                        khẩu học, tập hợp hay kỹ thuật, đều nhằm mục đích điều
                        hành và cải tiến Website MyJob, tăng cường tiện ích cho
                        người sử dụng hoặc giới thiệu và phân phối các sản phẩm
                        và dịch vụ của chúng tôi.
                      </Text>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        Chúng tôi cũng có thể dùng thông tin thu thập được để
                        thông báo cho bạn về những sản phẩm và dịch vụ do
                        Website MyJob hay các công ty đối tác cung cấp, hoặc để
                        xin ý kiến của bạn về các sản phẩm và dịch vụ hiện tại
                        hay những sản phẩm và dịch vụ tiềm năng mới.
                      </Text>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        Chúng tôi cũng có thể dùng thông tin liên lạc của bạn để
                        gửi cho bạn email hoặc các thông báo khác về những cập
                        nhật tại website tuyển dụng của MyJob. Nội dung và tần
                        suất của những thông báo này sẽ thay đổi tuỳ thuộc vào
                        thông tin mà chúng tôi có về bạn. Ngoài ra, vào lúc đăng
                        ký, bạn có quyền lựa chọn nhận những thông tin, thông
                        báo và các chương trình khuyến mãi bao gồm nhưng không
                        hạn chế các bản tin miễn phí từ Website MyJob liên quan
                        đến những chủ đề mà bạn có thể đặc biệt quan tâm.
                      </Text>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        Chúng tôi có một khu vực để bạn có thể liên lạc với
                        chúng tôi. Bất kỳ phản hồi nào bạn gửi đến cho chúng tôi
                        sẽ trở thành tài sản của chúng tôi và chúng tôi có thể
                        dùng phản hồi đó (chẳng hạn các câu chuyện thành công)
                        cho các mục đích tiếp thị, hoặc liên hệ với bạn để có
                        thêm thông tin.
                      </Text>
                    </VStack>
                  </View>
                </View>
                <View>
                  <Text
                    fontFamily="DMSans-Bold"
                    fontSize="lg"
                    color="myJobCustomColors.haitiBluePurple">
                    Ai đang thu thập thông tin của bạn
                  </Text>
                  <View paddingTop={4}>
                    <VStack space={2}>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        Khi được hỏi về các thông tin cá nhân trên website tuyển
                        dụng của MyJob, có nghĩa là bạn đang chia sẻ thông tin
                        đó với riêng Website MyJob, trừ phi có thông báo cụ thể
                        khác. Tuy nhiên, một số hoạt động do đặc trưng của
                        chúng, sẽ dẫn đến việc thông tin cá nhân của bạn được
                        tiết lộ cho những người sử dụng khác của Website MyJob
                        biết. Ví dụ, khi bạn điền thông tin cá nhân lên bản đăng
                        quảng cáo tuyển dụng, thông tin này nói chung sẽ được
                        gộp trong công việc của bạn, trừ phi có thông báo cụ thể
                        khác.
                      </Text>
                    </VStack>
                  </View>
                </View>
                <View>
                  <Text
                    fontFamily="DMSans-Bold"
                    fontSize="lg"
                    color="myJobCustomColors.haitiBluePurple">
                    Thông tin của bạn có thể chia sẻ với ai
                  </Text>
                  <View paddingTop={4}>
                    <VStack space={2}>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        Chúng tôi không tiết lộ cho bên thứ ba thông tin cá nhân
                        của bạn, cũng như thông tin cá nhân và nhân khẩu học kết
                        hợp, hoặc thông tin về việc sử dụng Website MyJob của
                        bạn (chẳng hạn các khu vực bạn ghé thăm, hay các dịch vụ
                        mà bạn truy cập), trừ năm mục sau đây.
                      </Text>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        1. Chúng tôi có thể để lộ thông tin như vậy cho các nhóm
                        thứ ba nếu bạn đồng ý. Ví dụ, nếu bạn cho biết bạn muốn
                        nhận thông tin về các sản phẩm và dịch vụ của bên thứ ba
                        khi đăng ký một tài khoản trên Website MyJob, chúng tôi
                        có thể cung cấp thông tin liên hệ của bạn cho bên thứ ba
                        đó, ví dụ người sử dụng lao động, các nhà tuyển dụng,
                        người thu thập dữ liệu, nhân viên thị trường hoặc những
                        người khác với mục đích gửi email cho bạn hay liên lạc
                        với bạn theo cách khác. Chúng tôi có thể dùng dữ liệu đã
                        có về bạn (như các mối quan tâm hay sở thích mà bạn đã
                        trình bày) để xác định xem liệu bạn có thể quan tâm đến
                        các sản phẩm hay dịch vụ của một bên thứ ba cụ thể nào
                        không.
                      </Text>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        2. Chúng tôi có thể tiết lộ thông tin như vậy cho các
                        công ty và cá nhân mà chúng tôi thuê để thay mặt chúng
                        tôi thực hiện các chức năng của công ty. Ví dụ, việc lưu
                        giữ các máy chủ web, phân tích dữ liệu, cung cấp các trợ
                        giúp về marketing, xử lý thẻ tín dụng hoặc các hình thức
                        thanh toán khác, và dịch vụ cho khách hàng. Những công
                        ty và cá nhân này sẽ truy cập tới thông tin cá nhân của
                        bạn khi cần để thực hiện các chức năng của họ, nhưng
                        không chia sẻ thông tin đó với bất kỳ bên thứ ba nào
                        khác.
                      </Text>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        3. Chúng tôi có thể tiết lộ thông tin như vậy nếu có yêu
                        cầu pháp lý, hay từ một cơ quan chính phủ hoặc nếu chúng
                        tôi tin rằng hành động đó là cần thiết nhằm: (a) tuân
                        theo các yêu cầu pháp lý hoặc chiếu theo quy trình của
                        luật pháp; (b) bảo vệ các quyền hay tài sản của Navigos
                        Group, Ltd, hoặc các công ty đối tác; (c) ngăn chặn tội
                        phạm hoặc bảo vệ an ninh quốc gia; hoặc (d) bảo vệ an
                        toàn cá nhân của những người sử dụng hay công chúng
                      </Text>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        4. Chúng tôi có thể tiết lộ và chuyển thông tin như vậy
                        tới một nhóm thứ ba, đối tượng mua lại toàn bộ hay phần
                        lớn công việc kinh doanh của công ty Navigos Group, Ltd,
                        bằng cách liên kết, hợp nhất hoặc mua toàn bộ hay phần
                        lớn các tài sản của chúng tôi. Ngoài ra, trong tình
                        huống Navigos Group, Ltd trở thành đối tượng của một vụ
                        khởi kiện phá sản, dù tự nguyện hay miễn cưỡng, thì
                        Navigos Group, Ltd hay người được uỷ thác có thể bán,
                        cho phép hoặc tiết lộ thông tin như vậy theo cách khác
                        trong quá trình chuyển giao được toà án về phá sản đồng
                        ý.
                      </Text>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        5. Chúng tôi có thể dùng tên bạn, tên hay logo của công
                        ty bạn, hay thông tin khác về hoặc từ các quảng cáo
                        tuyển dụng hoặc tài khoản xem hồ sơ ứng viên của bạn cho
                        bất kỳ hay tất cả các mục đích tiếp thị của Navigos
                        Group (hay Website MyJob). Ví dụ, các tên hay logo công
                        ty có thể được dùng trong quảng cáo trên báo, thư gửi
                        trực tiếp, phương tiện bán hàng, áp phích quảng cáo và
                        các tài liệu khác liên quan đến Website MyJob hay các
                        tài sản khác của Navigos Group, Ltd.
                      </Text>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        Navigos Group, Ltd cũng có thể chia sẻ thông tin vô danh
                        về khách ghé thăm một trong các Web của công ty (ví dụ,
                        số khách đến mục ‘Tìm việc’ của Website MyJob) với các
                        khách hàng, đối tác và bên thứ ba khác để họ có thể hiểu
                        về các loại khách tới thăm website của Website MyJob và
                        cách họ sử dụng site.
                      </Text>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        Navigos Group, Ltd có thể hỗ trợ công nghệ, lưu trữ Web
                        và các dịch vụ liên quan khác cho các công ty hàng đầu
                        khác để thiết lập mục tuyển dụng trên website của họ
                        (đôi khi được gọi là “khu vực tuyển dụng”). Thông tin cá
                        nhân và/hoặc có tính nhân khẩu học do bạn cung cấp trong
                        các khu vực tuyển dụng trở thành một phần của cơ sở dữ
                        liệu của Website MyJob, nhưng không ai có thể truy cập
                        trừ bạn, Navigos Group, Ltd và công ty có liên quan mà
                        không có sự đồng ý của bạn.
                      </Text>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        Thông tin được thu thập trên trang thuộc khu vực tuyển
                        dụng, hoặc trên trang chia sẻ nhãn hiệu (như trang về
                        một cuộc thi do Website MyJob và công ty khác đồng tài
                        trợ) có thể trở thành tài sản của công ty đó, hoặc của
                        cả Navigos Group, Ltd và công ty đó. Trong ví dụ này,
                        việc sử dụng thông tin như vậy của công ty kia có thể
                        phụ thuộc vào chính sách bảo mật của công ty đó và,
                        trong trường hợp bất kỳ nào, Navigos Group, Ltd không
                        chịu trách nhiệm về việc công ty kia sử dụng thông tin
                        cá nhân và nhân khẩu học của bạn.
                      </Text>
                    </VStack>
                  </View>
                </View>
                <View>
                  <Text
                    fontFamily="DMSans-Bold"
                    fontSize="lg"
                    color="myJobCustomColors.haitiBluePurple">
                    Những lựa chọn dành cho bạn khi thu thập, sử dụng và phân
                    phối thông tin cá nhân
                  </Text>
                  <View paddingTop={4}>
                    <VStack space={2}>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        Nếu bạn chọn không đăng ký hoặc cung cấp thông tin cá
                        nhân, bạn sẽ không thể dùng phần lớn website của Website
                        MyJob.
                      </Text>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        Bạn cũng có các lựa chọn liên quan tới các cookie. Bằng
                        cách thay đổi các ưu tiên trình duyệt của mình, bạn có
                        thể chọn chấp nhận tất cả các cookie, hay được thông báo
                        khi một cookie được thiết lập, hoặc loại bỏ tất cả các
                        cookie. Nếu bạn chọn loại bỏ tất cả các cookie, bạn sẽ
                        không thể dùng các dịch vụ của Website MyJob có yêu cầu
                        đăng ký sử dụng. Những dịch vụ này bao gồm việc nhận
                        dạng các công việc mới đã được đăng lên từ lần ghé thăm
                        cuối cùng, tự đăng nhập và tính năng kiểm tra danh sách.
                        Bạn vẫn có thể dùng hầu hết các tính năng của website
                        tuyển dụng MyJob ngay cả khi bạn không chấp nhận các
                        cookie.
                      </Text>
                    </VStack>
                  </View>
                </View>
                <View>
                  <Text
                    fontFamily="DMSans-Bold"
                    fontSize="lg"
                    color="myJobCustomColors.haitiBluePurple">
                    Bạn có thể truy nhập, cập nhật và xoá thông tin của bạn như
                    thế nào
                  </Text>
                  <View paddingTop={4}>
                    <VStack space={2}>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        Chúng tôi sẽ cung cấp cho bạn các phương tiện đảm bảo
                        thông tin cá nhân của bạn là chính xác và cập nhật. Bạn
                        có thể hiệu chỉnh hoặc xoá hồ sơ của bạn bất cứ lúc nào
                        khi nhấn vào liên kết “My profile” hoặc vào hình ảnh do
                        hệ thống cung cấp ngay khi bạn đăng nhập vào. Khi đăng
                        nhập vào hệ thống trong một khoảng thời gian nào đó, dù
                        bạn đang ở đâu trên website tuyển người Website MyJob,
                        thông tin của bạn sẽ được giữ nguyên cho đến khi bạn
                        nhấn chuột vào liên kết “Logoff” là liên kết có thể truy
                        nhập từ màn hình “My Profile”
                      </Text>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        Nếu bạn là người sử dụng đã đăng ký và quên mật khẩu,
                        bạn có thể nhận lại nó bằng cách gửi email và dùng tính
                        năng “Forgot Password”. Nhấn phím trên bất kỳ trang đăng
                        nhập nào để yêu cầu gửi mật khẩu của bạn cho bạn. Chúng
                        tôi không thể cung cấp mật khẩu của bạn theo các cách
                        khác.
                      </Text>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        Tài khoản Website MyJob của bạn có thể bị xoá, nhưng làm
                        như vậy sẽ dẫn đến việc không thể truy nhập đến bất kỳ
                        tính năng nào đòi hỏi đăng nhập. Chúng tôi sẽ hoặc có
                        thể giữ một bản sao lưu trữ về tài khoản của bạn song
                        không thể truy nhập trên Internet.
                      </Text>
                    </VStack>
                  </View>
                </View>
                <View>
                  <Text
                    fontFamily="DMSans-Bold"
                    fontSize="lg"
                    color="myJobCustomColors.haitiBluePurple">
                    Những biện pháp phòng ngừa an toàn chống mất mát, lạm dụng
                    hoặc thay đổi thông tin của bạn
                  </Text>
                  <View paddingTop={4}>
                    <VStack space={2}>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        Ngoài người quản trị Website MyJob hoặc cá nhân được uỷ
                        quyền khác của Website MyJob ra, bạn là người duy nhất
                        được truy nhập đến thông tin cá nhân của mình. Đăng ký
                        sử dụng của bạn được bảo vệ bằng mật khẩu để ngăn chặn
                        sự truy nhập trái phép.
                      </Text>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        Chúng tôi khuyến nghị bạn không để lộ mật khẩu của bạn
                        cho bất kỳ ai. Website MyJob không bao giờ hỏi mật khẩu
                        của bạn qua điện thoại hay qua email tự nguyện. Để bảo
                        đảm an toàn, bạn có thể muốn ra khỏi mạng ngay khi sử
                        dụng xong Website MyJob. Điều này đảm bảo những người
                        khác không thể truy nhập tới thông tin và thư từ cá nhân
                        của bạn nếu bạn dùng chung máy tính với ai đó hoặc dùng
                        máy tính ở nơi công cộng như thư viện hay quán cà phê
                        Internet.
                      </Text>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        Đáng tiếc là không có dữ liệu nào truyền trên Internet
                        có thể bảo đảm an toàn 100%. Do vậy, mặc dù chúng tôi cố
                        gắng hết sức bảo vệ thông tin cá nhân của bạn, Website
                        MyJob có thể không thể bảo đảm hoặc cam kết về tính an
                        toàn của thông tin bất kỳ mà bạn chuyển tới chúng tôi
                        hoặc từ dịch vụ trực tuyến của chúng tôi, và bạn phải tự
                        chịu rủi ro. Ngay khi chúng tôi nhận được thông tin bạn
                        gửi tới, chúng tôi sẽ cố gắng hết sức để bảo đảm an toàn
                        trên hệ thống của chúng tôi.
                      </Text>
                    </VStack>
                  </View>
                </View>
                <View>
                  <Text
                    fontFamily="DMSans-Bold"
                    fontSize="lg"
                    color="myJobCustomColors.haitiBluePurple">
                    Cách Website MyJob bảo vệ đời tư của trẻ em.
                  </Text>
                  <View paddingTop={4}>
                    <VStack space={2}>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        Website MyJob là website có đối tượng độc giả lớn. Trẻ
                        em sẽ phải xin phép bố mẹ trước khi gửi trực tuyến thông
                        tin cá nhân tới ai đó. Website MyJob không thể chia sẻ
                        thông tin cá nhân về những người sử dụng dưới 13 tuổi
                        với bên thứ ba. Ngoài ra, Website MyJob sẽ không gửi bất
                        kỳ email trực tiếp nào đề nghị người sử dụng thông báo
                        họ dưới 13 tuổi.
                      </Text>
                    </VStack>
                  </View>
                </View>
                <View>
                  <Text
                    fontFamily="DMSans-Bold"
                    fontSize="lg"
                    color="myJobCustomColors.haitiBluePurple">
                    Bạn biết gì nữa về đời tư trực tuyến của bạn
                  </Text>
                  <View paddingTop={4}>
                    <VStack space={2}>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        Hãy luôn nhớ rằng bất kỳ lúc nào bạn tự nguyện tiết lộ
                        thông tin cá nhân của bạn trực tuyến, ví dụ qua công
                        việc bạn đăng lên hay qua email, thông tin đó có thể bị
                        người khác thu thập và sử dụng, Tóm lại, nếu bạn gửi
                        thông tin cá nhân trực tuyến có thể truy nhập công khai,
                        bạn có thể nhận sẽ được những thông báo tự nguyện từ
                        những đối tác khác.
                      </Text>
                      <Text
                        textAlign="justify"
                        color="myJobCustomColors.mulledWine">
                        Cuối cùng, bạn phải tự chịu trách nhiệm về việc giữ bí
                        mật cho mật khẩu và/hoặc các thông tin tài khoản bất kỳ.
                        Vì thế, xin hãy cẩn thận và có trách nhiệm khi nào bạn ở
                        trên mạng.
                      </Text>
                    </VStack>
                  </View>
                </View>
              </VStack>
            </ScrollView>
          </>
        )}
      </View>
    </>
  );
};

export default PrivacyPolicyScreen;
