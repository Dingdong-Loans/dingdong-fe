
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkeletonLoader from "@/components/SkeletonLoader";
import { Check, Info, FileText, Image } from "lucide-react";
import { Link } from "react-router-dom";

const KYC = () => {
  //state management
  const [currentStep, setCurrentStep] = useState(1);  //state yang menyimpan informasi dari langkah dari KYC user
  const [isLoading, setIsLoading] = useState(false);  //state untuk loading

  //state yang memeriksa apakah user telah mengisi 
  // semua data yang diperlukan sebelum menuju step sekalnjutnya.
  //Digunakan untuk memberi warna hijau pada indikator progres
  const [completedSteps, setCompletedSteps] = useState<number[]>([]); 
  
  //menyimpan informasi mengenai data yang user tuliskan pada form yang tersedia
  const [formData, setFormData] = useState({
    nik: "",
    npwp: "",
    businessName: "",
    businessType: "",
    ktpFile: null as File | null,
    selfieFile: null as File | null,
    businessLicenseFile: null as File | null,
    agreeToTerms: false
  });

  const totalSteps = 3; //step KYC dibagi menjadi 3 bagian. Mulai dari data diri, data usaha, hingga konfirmasi akhir
  const progressPercentage = (currentStep / totalSteps) * 100;  //Persentase laju kemanjuan dari progres KYC user

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, fileType: string) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, [`${fileType}File`]: file }));
    }
  };

  const handleNextStep = () => {
    setIsLoading(true);
    // Simulate processing time
    setTimeout(() => {
      setCompletedSteps(prev => [...prev, currentStep]);
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
      setIsLoading(false);
    }, 1500);
  };

  const handlePreviousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };


  /*
  Terdapat 3 variabel selain komponen utama.
  renderStep1, 2, dan 3 adalah variabel yang return
  UI untuk setiap langkah dari KYC. Mulai dari
  data diri, data usaha, hingga konfirmasi akhir
  */
  const renderStep1 = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Verifikasi Identitas</CardTitle>
        <CardDescription>
          Masukkan data identitas pribadi Anda untuk memverifikasi akun
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="nik">NIK (Nomor Induk Kependudukan) *</Label>
          <Input
            id="nik"
            placeholder="Masukkan 16 digit NIK Anda"
            value={formData.nik}
            onChange={(e) => setFormData(prev => ({ ...prev, nik: e.target.value }))}
            maxLength={16}
          />
        </div>

        <div className="space-y-3">
          <Label>Upload Foto KTP *</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              Klik untuk upload foto KTP yang jelas dan tidak buram
            </p>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, "ktp")}
              className="hidden"
              id="ktp-upload"
            />
            <Label htmlFor="ktp-upload" className="cursor-pointer">
              <Button variant="outline" type="button">
                Pilih File
              </Button>
            </Label>
            {formData.ktpFile && (
              <p className="text-sm text-green-600 mt-2">
                ✓ {formData.ktpFile.name}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <Label>Upload Foto Selfie dengan KTP *</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <Image className="mx-auto h-12 w-12 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              Ambil foto selfie sambil memegang KTP di sebelah wajah Anda
            </p>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, "selfie")}
              className="hidden"
              id="selfie-upload"
            />
            <Label htmlFor="selfie-upload" className="cursor-pointer">
              <Button variant="outline" type="button">
                Ambil Foto
              </Button>
            </Label>
            {formData.selfieFile && (
              <p className="text-sm text-green-600 mt-2">
                ✓ {formData.selfieFile.name}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Informasi Usaha</CardTitle>
        <CardDescription>
          Berikan informasi tentang usaha UMKM Anda
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="businessName">Nama Usaha *</Label>
          <Input
            id="businessName"
            placeholder="Contoh: Warung Makan Sederhana"
            value={formData.businessName}
            onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessType">Jenis Usaha *</Label>
          <Input
            id="businessType"
            placeholder="Contoh: Kuliner, Fashion, Kerajinan"
            value={formData.businessType}
            onChange={(e) => setFormData(prev => ({ ...prev, businessType: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="npwp">NPWP (Opsional)</Label>
          <Input
            id="npwp"
            placeholder="Masukkan nomor NPWP jika ada"
            value={formData.npwp}
            onChange={(e) => setFormData(prev => ({ ...prev, npwp: e.target.value }))}
          />
        </div>

        <div className="space-y-3">
          <Label>Surat Izin Usaha (Opsional)</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              Upload dokumen izin usaha jika tersedia (SIUP, NIB, dll)
            </p>
            <Input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleFileUpload(e, "businessLicense")}
              className="hidden"
              id="license-upload"
            />
            <Label htmlFor="license-upload" className="cursor-pointer">
              <Button variant="outline" type="button">
                Pilih File
              </Button>
            </Label>
            {formData.businessLicenseFile && (
              <p className="text-sm text-green-600 mt-2">
                ✓ {formData.businessLicenseFile.name}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Konfirmasi & Persetujuan</CardTitle>
        <CardDescription>
          Tinjau informasi Anda dan berikan persetujuan final
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <h4 className="font-semibold">Ringkasan Data yang Dikirim:</h4>
          <div className="text-sm space-y-1">
            <p>• NIK: {formData.nik}</p>
            <p>• Nama Usaha: {formData.businessName}</p>
            <p>• Jenis Usaha: {formData.businessType}</p>
            <p>• NPWP: {formData.npwp || "Tidak diisi"}</p>
            <p>• Foto KTP: {formData.ktpFile ? "✓ Terupload" : "✗ Belum diupload"}</p>
            <p>• Foto Selfie: {formData.selfieFile ? "✓ Terupload" : "✗ Belum diupload"}</p>
            <p>• Surat Izin: {formData.businessLicenseFile ? "✓ Terupload" : "Tidak diupload"}</p>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            checked={formData.agreeToTerms}
            onCheckedChange={(checked) => 
              setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))
            }
          />
          <Label htmlFor="terms" className="text-sm leading-5">
            Saya menyetujui{" "}
            <Link to="#" className="text-blue-600 hover:underline">
              Syarat & Ketentuan
            </Link>{" "}
            dan{" "}
            <Link to="#" className="text-blue-600 hover:underline">
              Kebijakan Privasi
            </Link>{" "}
            Dingdong Loans. Data yang saya berikan adalah benar dan dapat dipertanggungjawabkan.
          </Label>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-start space-x-2">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-900">Keamanan Data Terjamin</p>
              <p className="text-blue-700">
                Semua data yang Anda berikan akan dienkripsi dan disimpan dengan aman. 
                Kami tidak akan membagikan informasi pribadi Anda kepada pihak ketiga tanpa persetujuan.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  //Fungsi yang mengatur tampilan UI dari step KYC berdasarkan variabel currentStep
  const renderStepContent = () => {
    if (isLoading) {
      return (
        <div className="w-full max-w-2xl mx-auto">
          <SkeletonLoader type="form" />
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return renderStep1();
    }
  };

  //FUngsi yang memeriksa kelengkapan data dan input user sebelum diproses untuk langkah selanjutnya
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.nik.length === 16   //&& formData.ktpFile && formData.selfieFile;
      case 2:
        return formData.businessName && formData.businessType;
      case 3:
        return formData.agreeToTerms;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Verifikasi Identitas (KYC)
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Untuk memastikan keamanan dana Anda dan mematuhi regulasi yang berlaku, 
            kami perlu memverifikasi identitas Anda. Proses ini hanya memakan waktu beberapa menit.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium">Langkah {currentStep} dari {totalSteps}</span>
            <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}% selesai</span>
          </div>
          <Progress value={progressPercentage} className="w-full" />
          
          <div className="flex justify-between mt-4">
            <div className="flex items-center space-x-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                completedSteps.includes(1) ? 'bg-green-500 text-white' : 
                currentStep === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {completedSteps.includes(1) ? <Check className="h-4 w-4" /> : '1'}
              </div>
              <span className="text-sm">Identitas</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                completedSteps.includes(2) ? 'bg-green-500 text-white' : 
                currentStep === 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {completedSteps.includes(2) ? <Check className="h-4 w-4" /> : '2'}
              </div>
              <span className="text-sm">Usaha</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                completedSteps.includes(3) ? 'bg-green-500 text-white' : 
                currentStep === 3 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {completedSteps.includes(3) ? <Check className="h-4 w-4" /> : '3'}
              </div>
              <span className="text-sm">Konfirmasi</span>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        {!isLoading && (
          <div className="flex justify-between max-w-2xl mx-auto">
            <Button
              variant="outline"
              onClick={handlePreviousStep}
              disabled={currentStep === 1}
            >
              Kembali
            </Button>
            
            <div className="flex space-x-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    Butuh Bantuan?
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Bantuan KYC</DialogTitle>
                    <DialogDescription>
                      Tim support kami siap membantu Anda menyelesaikan proses verifikasi.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-sm">
                      <strong>WhatsApp:</strong> +62 812-3456-7890
                    </p>
                    <p className="text-sm">
                      <strong>Email:</strong> support@dingdongloans.com
                    </p>
                    <p className="text-sm">
                      <strong>Jam Operasional:</strong> Senin-Jumat, 09:00-17:00 WIB
                    </p>
                  </div>
                </DialogContent>
              </Dialog>

              {currentStep < totalSteps ? (
                <Button
                  onClick={handleNextStep}
                  disabled={!canProceed()}
                  className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                >
                  Lanjutkan
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                      // Simulate submission
                      alert("KYC berhasil dikirim! Tim kami akan meninjau dalam 1-2 hari kerja.");
                      setIsLoading(false);
                    }, 2000);
                  }}
                  disabled={!canProceed()}
                  className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                >
                  Kirim Verifikasi
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default KYC;
