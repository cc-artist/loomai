export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* 页面标题 */}
      <section className="text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            隐私政策
          </span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          我们重视您的隐私，本政策说明了我们如何收集、使用和保护您的个人信息。
        </p>
      </section>

      {/* 隐私政策内容 */}
      <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">1. 引言</h2>
          <p className="text-gray-300 leading-relaxed">
            欢迎访问 LOOM。我们致力于保护您的隐私和个人信息安全。本隐私政策解释了我们如何收集、使用、存储和披露您的信息，以及您拥有的权利。
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">2. 信息收集</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            我们可能收集以下类型的信息：
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 pl-4">
            <li>您提供的信息：当您使用我们的服务时，您可能会向我们提供个人信息，例如您的姓名、电子邮件地址和问题内容。</li>
            <li>自动收集的信息：我们可能会自动收集有关您使用我们服务的信息，例如您的IP地址、浏览器类型、设备信息和使用数据。</li>
            <li>Cookies：我们使用Cookies和类似技术来改善您的体验，了解您如何使用我们的服务。</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">3. 信息使用</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            我们使用收集的信息用于以下目的：
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 pl-4">
            <li>提供和维护我们的服务</li>
            <li>处理您的请求和问题</li>
            <li>改善我们的服务和用户体验</li>
            <li>发送重要通知和更新</li>
            <li>防止欺诈和滥用</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">4. 信息共享</h2>
          <p className="text-gray-300 leading-relaxed">
            我们不会向第三方出售或出租您的个人信息。我们可能会在以下情况下共享您的信息：
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 pl-4">
            <li>获得您的明确同意</li>
            <li>遵守法律义务或响应法律程序</li>
            <li>保护我们的权利、财产或安全</li>
            <li>与我们的服务提供商共享，他们仅在代表我们提供服务时使用您的信息</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">5. 数据安全</h2>
          <p className="text-gray-300 leading-relaxed">
            我们采取合理的安全措施来保护您的个人信息，防止未经授权的访问、使用或披露。然而，请注意，没有任何安全措施是绝对可靠的，我们不能保证您的信息完全安全。
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">6. 您的权利</h2>
          <p className="text-gray-300 leading-relaxed">
            根据适用法律，您可能拥有以下权利：
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 pl-4">
            <li>访问您的个人信息</li>
            <li>更正不准确的信息</li>
            <li>删除您的个人信息</li>
            <li>限制或反对我们使用您的信息</li>
            <li>数据可携带权</li>
            <li>撤回同意</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">7. 政策更新</h2>
          <p className="text-gray-300 leading-relaxed">
            我们可能会不时更新本隐私政策。我们将通过在网站上发布更新后的政策来通知您任何更改。建议您定期查看本政策以了解我们如何保护您的信息。
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">8. 联系我们</h2>
          <p className="text-gray-300 leading-relaxed">
            如果您对本隐私政策有任何问题或疑虑，请通过以下方式联系我们：
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            电子邮件：privacy@mysticx.ai<br />
            地址：虚拟地址，仅供参考
          </p>
        </div>
      </section>
    </div>
  )
}